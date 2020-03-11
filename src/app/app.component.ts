import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CommonService } from "./common.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public options: any;

  constructor(private fb: FormBuilder, private cs: CommonService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      StyleName: [null],
      StyleId: [null]
    });
  }

  public complete(event: any): void {
    const { query } = event;
    this.cs
      .getSuggestions(query || null)
      .toPromise()
      .then(opts => {
        this.options = opts;
      });
  }
}
