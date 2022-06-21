import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-accesos',
  templateUrl: './agregar-accesos.component.html',
  styleUrls: ['./agregar-accesos.component.scss']
})
export class AgregarAccesosComponent implements OnInit {

  constructor() { 
    document.body.className = "popup";
  }

  ngOnInit(): void {
  }

}
