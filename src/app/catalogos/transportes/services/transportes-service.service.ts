import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListavehiculosI } from '../model/vehiculos.Interface';

@Injectable({
  providedIn: 'root'
})
export class TransportesServiceService {
 
  headers = new Headers();

  _urlOperaciones    = 'ws_tiw_lov/api/operaciones'
  _urlTransportistas = 'ws_tiw_lov/api/transportistas'
  _urlListaVehiculos = 'ws_tiw_catalogos/api/vehiculos/listado'
  _urlTiposVehiculos = 'ws_tiw_lov/api/tipos_vehiculo'
  _urlPlataformas    = 'ws_tiw_lov/api/plataformas'
  _urlAntenas        = 'ws_tiw_lov/api/antenas'
  _urlOperadores     = 'ws_tiw_lov/api/operadores'
  _urlVehiculo       = 'ws_tiw_catalogos/api/vehiculos'
  _urlCrearVehiculo  = 'ws_tiw_catalogos/api/vehiculos/crea'
  _urlEliminaVehiculo= 'ws_tiw_catalogos/api/vehiculos/elimina'

  constructor(private http: HttpClient) {
      this.headers.append("Content-Type","application/json")
      this.headers.append("Authorization","Basic "+"V1M6V1M=")
   }

   getOperaciones(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post(this._urlOperaciones,{
      headers: header
    })
  }
  getTransportistas(operacion:string){
    const body = {"filtro1":operacion};
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<any>(this._urlTransportistas,body,{
      headers: header
    })
  }
  getVehiculos(operacion:string,transportista:string,vehiculo:string,antena:string,status:string,rowmin:number,rowmax:number){
    const body = {"antena": antena,
                  "datoVehiculo": vehiculo,
                  "operacion": operacion,
                  "regf": "",
                  "regi": "",
                  "status": status,
                  "transportista": transportista};
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post(this._urlListaVehiculos,body,{
      headers: header
    })
  }
  getAntenas(antena:string,plataforma:string){
    const body = {"filtro1": plataforma,"filtro2":antena}
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post(this._urlAntenas,body,{
      headers: header
    })

  }
  getTiposVehiculo(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<any>(this._urlTiposVehiculos,{
      headers: header
    })
  }
  getPlataformas(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<any>(this._urlPlataformas,{
      headers: header
    })
  }
  getOperadores(filtro1:string,filtro2:string,filtro3:string,filtro4:string,filtro5:string,filtro6:string){
    const body = {
      "filtro1": filtro1,
      "filtro2": filtro2,
      "filtro3": filtro3,
      "filtro4": filtro4,
      "filtro5": filtro5,
      "filtro6": filtro6
                }
    let header =  new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post(this._urlOperadores,body,{
      headers: header
    })
  }
  getVehiculo(code:string){
    const url='ws_tiw_catalogos/api/vehiculos/vehiculo?codigo='+code
    let header =  new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<ListavehiculosI>(url,{
      headers: header
    })
  }
  crearVehiculo(vehiculo:ListavehiculosI){
    //console.log('objeto en servicio->'+JSON.stringify(vehiculo))
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<any>(this._urlCrearVehiculo,vehiculo,{
      headers: header
    })
  }
  eliminaVehiculo(code:number){
    const body = {"code": code};
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    .set('Authorization',"Basic "+"V1M6V1M=")
    return this.http.post<any>(this._urlEliminaVehiculo,body,{
      headers: header
    })
  }

}
