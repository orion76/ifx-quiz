import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IStorageService} from './types';


@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorageService {
  storageName = 'test_storage';
  subject: BehaviorSubject<string[]>;
  state$: Observable<string[]>;

  constructor() {
    this.subject = new BehaviorSubject<string[]>(this.getAll());
    this.state$ = this.subject.asObservable();
  }

  getState() {
    return this.state$;
  }

  create(value: string) {

    const state = this.subject.getValue() || [];
    if (!state.includes(value)) {
      state.push(value);
      localStorage.setItem(this.storageName, JSON.stringify(state));
      this.subject.next(state);
    }
  }

  update(valueOld: string, valueNew: string) {
    const state: string[] = this.subject.getValue() || [];
    const index = state.indexOf(valueOld);
    if (index > -1) {
      state.splice(index, 1, valueNew);
      this.subject.next(state);
    } else {
      state.push(valueNew);
      this.subject.next(state);
    }
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.storageName));
  }

}
