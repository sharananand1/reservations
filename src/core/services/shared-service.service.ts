import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SharedServiceService {
  userLoggedIn = new EventEmitter<any>();
  addToCart = new EventEmitter<any>();
  searchEmit = new EventEmitter<any>();

  constructor() {
  }
}
