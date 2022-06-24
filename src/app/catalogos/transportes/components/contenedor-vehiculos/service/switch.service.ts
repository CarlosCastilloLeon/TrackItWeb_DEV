import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  @Output() enviaCode: EventEmitter<string> = new EventEmitter();

  constructor() { }

  $modal = new EventEmitter<any>();
  $visible =  new EventEmitter<any>();
  
}
