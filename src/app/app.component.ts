import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommonService} from './common.service';
import {COMMON_SERVICE, EInputState, IData, IStorageService, STORAGE_SERVICE} from './types';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, withLatestFrom} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public options: any;
  public state$: Observable<IData[]>;
  private inputStateSubject: BehaviorSubject<IData>;
  private inputState$: Observable<IData>;
  private eventSubmit = new EventEmitter<boolean>();
  private eventRowSelect = new EventEmitter<IData>();

  constructor(
    @Inject(COMMON_SERVICE) private common: CommonService,
    @Inject(STORAGE_SERVICE) public storage: IStorageService,
    private fb: FormBuilder, private cs: CommonService) {
  }

  private _selection: IData;

  get selection() {
    return this._selection;
  }

  set selection(data: IData) {
    this._selection = data;
    this.eventRowSelect.emit(data);
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      StyleName: [null],
      StyleId: [null],
      Name: [null],
    });


    this.inputStateSubject = new BehaviorSubject<IData>({type: null, value: null});
    this.inputState$ = this.inputStateSubject.asObservable();

    this.initOnStorageChange();
    this.initOnUserInput();
    this.initOnUserInputSave();
    this.initOnEdit();
  }

  initOnEdit() {
    this.eventRowSelect
      .pipe(filter(Boolean))
      .subscribe((data: IData) => {
        this.clearForm();
        this.form.get('Name').setValue({id: null, name: data.value});
        switch (data.type) {
          case EInputState.ID:
            this.form.get('StyleId').setValue(data.value);
            break;
          case EInputState.NAME:
            this.form.get('StyleName').setValue(data.value);
            break;
        }
      });
  }

  initOnUserInputSave() {
    this.eventSubmit
      .pipe(
        filter(Boolean),
        withLatestFrom(this.inputState$, (_, state) => state)
      )
      .subscribe((state) => {
        if (this.selection) {
          this.storage.update(this.selection.value, state.value);
          this.selection = null;
        } else {
          this.storage.create(state.value);
        }
      });
  }

  Edit(event) {

    // this.state.edit(event.data);
  }

  public complete(event: any): void {
    const {query} = event;
    this.cs
      .getSuggestions(query || null)
      .toPromise()
      .then(opts => {
        this.options = opts;
      });
  }

  public nameChange(event: any): void {
    const {value} = event.target;
    this.inputStateSubject.next({type: EInputState.NAME, value});
  }

  public idChange(data: { id: number, name: string }): void {
    this.inputStateSubject.next({type: EInputState.ID, value: data.name});
  }

  public Submit(): void {
    this.eventSubmit.emit(true);
    this.storage.create(this.inputStateSubject.getValue().value);
    this.clearForm();
  }

  private clearForm() {
    this.form.setValue({StyleId: '', StyleName: '', Name: ''});
  }

  private initOnStorageChange() {
    this.state$ = this.storage.getState().pipe(
      filter(Boolean),
      withLatestFrom(this.common.getSuggestions(), (state: string[], ids) => {
        const idsSet = new Set(ids.map((item) => item.name));
        return state.map((value) => {
          const type = idsSet.has(value) ? EInputState.ID : EInputState.NAME;
          return {type, value};
        });
      }));
  }

  private initOnUserInput() {
    this.inputState$.subscribe((state) => {
      switch (state.type) {
        case EInputState.ID:
          this.form.get(['StyleId']).setValue(state.value);
          this.form.get(['StyleName']).setValue(null);
          break;
        case EInputState.NAME:
          this.form.get(['StyleName']).setValue(state.value);
          this.form.get(['StyleId']).setValue(null);
          break;
        case EInputState.EXISTS_EDIT:
          break;
      }
    });
  }
}


