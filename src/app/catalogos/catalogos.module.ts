import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DpDatePickerModule } from 'ng2-date-picker';
import { VehiculosComponent } from './transportes/components/contenedor-vehiculos/vehiculos/vehiculos.component';
import { TiposRemolqueComponent } from './transportes/components/tipos-remolque/tipos-remolque.component';
import { AgregarVehiculoComponent } from './transportes/components/contenedor-vehiculos/agregar-vehiculo/agregar-vehiculo.component';
import { ContenedorVehiculosComponent } from './transportes/components/contenedor-vehiculos/contenedor-vehiculos.component';
import { FormErrorContainerComponent } from '../shared/form-error-container/form-error-container.component';
import { FormErrorMsgComponent } from '../shared/form-error-msg/form-error-msg.component';
import { ModalComponent } from './_modal/modal.component';




@NgModule({
  declarations: [
        VehiculosComponent,
        TiposRemolqueComponent,
        AgregarVehiculoComponent,
        ContenedorVehiculosComponent,
        FormErrorContainerComponent,
        FormErrorMsgComponent,
        ModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule

  ]
})
export class CatalogosModule { }