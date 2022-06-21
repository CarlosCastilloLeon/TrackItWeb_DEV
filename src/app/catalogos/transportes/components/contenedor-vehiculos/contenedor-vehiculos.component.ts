import { Component, OnInit } from '@angular/core';
import { SwitchService } from './service/switch.service';

@Component({
  selector: 'app-contenedor-vehiculos',
  templateUrl: './contenedor-vehiculos.component.html',
  styleUrls: ['./contenedor-vehiculos.component.scss']
})
export class ContenedorVehiculosComponent implements OnInit {

  visibleSwitch:number=0;
  
  constructor(private modalSS: SwitchService) { }

  ngOnInit(): void {

    //Variable para visibilidad de componentes
    this.modalSS.$visible.subscribe((valor)=>{this.visibleSwitch =  valor})

  }

}
