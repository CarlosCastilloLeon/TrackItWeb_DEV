import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportesServiceService {
  _urlOperaciones    = 'http://localhost:3000/getOperaciones'
  _urlTransportistas = 'http://localhost:3000/getTransportistas'
  _urlVehiculos      = 'http://localhost:3000/getVehiculos'
  _urlAntenas      = 'http://localhost:3000/getAntenas'


  constructor(private http: HttpClient) {
   
   }

   getOperaciones(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._urlOperaciones,{
      headers: header
    })
  }

  getTransportistas(){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._urlTransportistas,{
      headers: header
    })
  }

  getVehiculos(operacion:string,transportista:string,vehiculo:string,antena:string,status:string,rowmin:number,rowmax:number){
    /*console.log('rowmin->'+rowmin);  
    console.log('rowmax->'+rowmax); */
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._urlVehiculos,{
      headers: header
    })
  }
  getAntenas(antena:string){
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
    return this.http.get(this._urlAntenas,{
      headers: header
    })

  }


}
