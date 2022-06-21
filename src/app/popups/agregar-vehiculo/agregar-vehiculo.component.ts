import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss']
})
export class AgregarVehiculoComponent implements OnInit {

  constructor() { 
    document.body.className = "popup";
  }

  ngOnInit(): void {
  }

}
