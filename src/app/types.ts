import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const STORAGE_SERVICE = new InjectionToken('STORAGE_SERVICE');
export const COMMON_SERVICE = new InjectionToken('COMMON_SERVICE');

export enum EInputState {
  ID = 'ID',
  NAME = 'NAME',
  EXISTS_EDIT = 'EXISTS_EDIT',
}

export interface IStorageService {


  create(value: string);

  update(value_old: string, value_new: string);

  getState(): Observable<string[]>;


}

export interface IData {
  value: string;
  type?: EInputState;
}
