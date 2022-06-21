// General
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Router
import { Routes, RouterModule } from '@angular/router';

// Datepicker
import { DpDatePickerModule } from 'ng2-date-picker'

// Componentes
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { MenuComponent } from './menu/menu.component';
import { PieComponent } from './pie/pie.component';
import { CatalogosSistemaRolesAccesoComponent } from './catalogos/catalogos-sistema-roles-acceso/catalogos-sistema-roles-acceso.component';
import { AgregarAccesosComponent } from './popups/agregar-accesos/agregar-accesos.component';
import { CatalogosTransportesVehiculosComponent } from './catalogos/catalogos-transportes-vehiculos/catalogos-transportes-vehiculos.component';
import { AgregarVehiculoComponent } from './popups/agregar-vehiculo/agregar-vehiculo.component';
import { CatalogosModule } from './catalogos/catalogos.module';
import { ContenedorVehiculosComponent } from './catalogos/transportes/components/contenedor-vehiculos/contenedor-vehiculos.component';

import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'catalogos_sistema_roles-acceso', component: CatalogosSistemaRolesAccesoComponent },
  { path: 'agregar-accesos', component: AgregarAccesosComponent },  
  { path: 'catalogos_transportes_vehiculos', component: CatalogosTransportesVehiculosComponent },
  { path: 'agregar-vehiculo', component: AgregarVehiculoComponent },
  { path: 'contenedor-vehiculos',component: ContenedorVehiculosComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    MenuComponent,
    PieComponent,
    CatalogosSistemaRolesAccesoComponent,
    AgregarAccesosComponent,
    CatalogosTransportesVehiculosComponent,
    AgregarVehiculoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    DpDatePickerModule,CatalogosModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
