import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private sug = Object.values(getComputedStyle(document.body)).map(
    (name, i) => ({
      id: i,
      name
    })
  );

  constructor() {}

  public getSuggestions(term = null): Observable<any[]> {
    const sugs = !term
      ? this.sug
      : this.sug.filter(opt => opt.name.toLowerCase().includes(term));
    return of(sugs);
  }
}
