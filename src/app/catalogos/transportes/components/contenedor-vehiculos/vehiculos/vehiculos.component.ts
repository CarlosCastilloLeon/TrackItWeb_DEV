import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';
import { ListavehiculosI } from '../../../model/vehiculos.Interface';
import { TransportesServiceService } from '../../../services/transportes-service.service';
import { SwitchService } from '../service/switch.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  
  selectedOper: any
  selectedTrans: any
  selectedPaginas: string='';
  statusDF:string='E'
  selectedStatus: any
  modalSwitch:boolean=false
  txtVehiculo:string='%';
  txtAntena:string='%';
  allOperaciones: Array<any>= []
  allTransportistas: Array<any>=[]
  /*Paginacion*/
  rowMin:number=1;
  rowMax:number=999;
  paginaActual:number=1;
  registrosPorPagina:number=21;
  totalVehiculos:number=0;
  totalPaginas:number=0;
  aux:number=0;
  aux2:string='';
  i2:number=1;
  allPaginas: Array<any>=[]
  vehiculos:ListavehiculosI[]=[]
  vehiculosAux:ListavehiculosI[]=[]
  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    weekDayFormat: 'dd'
  };
 
  constructor(
    private router: Router,
    private transportesService: TransportesServiceService,
    private modalSS: SwitchService
    ) { }

  ngOnInit(): void {
  
    //observable para modal
    //this.modalSS.$modal.subscribe((valor)=>{this.modalSwitch =  valor})
  
    this.getOperaciones();//Carga select de operaciones 
    this.getTransportistas('%')
    this.consultaListaInicial()//Carga inicial de vehiculos
  }
  consultaListaInicial(){
    this.transportesService.getVehiculos('%','%','%','%','E',0,0).subscribe((resp:any) =>{
      this.vehiculos = resp.data;
      this.totalVehiculos = this.vehiculos.length;
      //Crea paginacion inicial
        this.totalPaginas = this.calculaNoPaginas()
        this.calculaDivisionPaginas()
        this.setListaActual(0,this.registrosPorPagina);
  
    })
  }
  getOperaciones(){
    this.transportesService.getOperaciones().subscribe((resp:any) =>{
      this.allOperaciones = resp.data    
      })
  }
  getTransportistas(operacion:string){
    this.transportesService.getTransportistas(operacion).subscribe((resp:any) =>{
      this.allTransportistas = resp.data;    
    })
  }
  getVehiculos(operacion:string,transportista:string,vehiculo:string,antena:string,status:string,paginado:boolean){
      if(paginado){
        this.removeObjects();
        this.setListaActual(this.rowMin-1,this.rowMax);
      }else{
        this.removeObjects()
        this.transportesService.getVehiculos(operacion,transportista,vehiculo,antena,status,0,0).subscribe((resp:any) =>{
        this.vehiculos = resp.data; 
        this.totalVehiculos = this.vehiculos.length;
        this.totalPaginas = this.calculaNoPaginas()
        this.calculaDivisionPaginas()
        let max=this.totalVehiculos>this.registrosPorPagina?this.registrosPorPagina:this.totalVehiculos;
        console.log('max->'+max)
        this.setListaActual(0,max); 
        })
      }  
  }
  agregarVehiculo() {
    this.modalSS.$visible.emit(1);
  }
  updateVehiculo(code: number,operacion: string){
    this.modalSS.enviaCode.emit(String(code));
    this.modalSS.$visible.emit(1);
  }
  deleteVehiculo(code: number,operacion: string){
    console.log('code->'+code);
    this.transportesService.eliminaVehiculo(code).subscribe((resp:any) =>{
      resp.message;
      console.log('resp->'+resp.message)
      if(resp.message==='OK'){
        alert('El registro a sido eliminado exitosamente.');
        this.consultaListaInicial();
      }
      else
        alert('El registro no ha sido eliminado. Favor de verificar con soporte.');
    })
   
  }
  detailVehiculo(code: number, operacion: string){
  }
  consultarVehiculos(paginado:boolean){
    
    let status:string;
    if(String(this.selectedStatus)==='undefined')
      status='E'
    else if(String(this.selectedStatus)=='INACTIVO')
      status='D'
    else 
      status='%'
    let oper:string=String(this.selectedOper)==='undefined'?'%':this.selectedOper;
    let trans:string=String(this.selectedTrans)==='undefined'?'%':this.selectedTrans
    console.log(this.vehiculosAux.length)
    this.getVehiculos(oper,trans,this.txtVehiculo,this.txtAntena,status,paginado);
    this.txtAntena='%'
    this.txtVehiculo='%'
  }
 //event handler for the select element's change event
 selectChangeHandlerOper (event: any) {
  let operValue = event.target.value;
  console.log('operacion->'+operValue);
  this.getTransportistas(String(operValue)==='undefined'?'%':operValue)
}
selectChangeHandlerTrans (event: any) {
  let transValue = event.target.value;
  console.log('transportista->'+transValue);
}
selectChangeHandlerStatus (event: any) {
  //update the ui
  let statusValue = event.target.value;
  console.log('status->'+statusValue);
}
  /* Bloque de Paginado  */ 
  calculaNoPaginas():number{
    return Math.ceil(this.totalVehiculos/this.registrosPorPagina);
  }
  calculaDivisionPaginas(){
    this.allPaginas=[]
    this.aux=0;
    this.aux2='';
    this.i2=1;
   for (let i = 1; i <= this.totalPaginas; i++) {
      this.aux = Math.round(this.registrosPorPagina * i);
      this.aux2 = "Pagina " + i + " /" + this.i2 + "-" + this.aux;
      if (i == this.totalPaginas) {
        this.aux2 = "Pagina " + i + " /" + this.i2 + "-" + this.totalVehiculos;
      }
    this.allPaginas[i]=this.aux2;
    this.i2 += this.registrosPorPagina;
    }
    
    this.removeUndefined();
    this.selectedPaginas = this.allPaginas[0];
   
   /* this.allPaginas.forEach(function (value) {
      console.log('allPaginas->'+value);
    });*/
  }
  pagAnterior(){
    if(this.paginaActual==1){
      console.log('no hago nada estoy en el inicio');
    }else{
      this.paginaActual--
      this.selectedPaginas=this.allPaginas[this.paginaActual-1];
      let pagina=this.selectedPaginas.split('/')
      let rango=pagina[1].split('-')
      let min:string=rango[0]
      let max:string=rango[1]
      this.rowMin=parseInt(min);
      this.rowMax=parseInt(max);
      this.consultarVehiculos(true)
      
    }
  }
  pagSiguiente(){
    if(this.paginaActual==this.totalPaginas){
      console.log('no hago nada estoy en el final');
    }else{
      this.paginaActual++
      this.selectedPaginas=this.allPaginas[this.paginaActual-1];
      let pagina=this.selectedPaginas.split('/')
      let rango=pagina[1].split('-')
      let min:string=rango[0]
      let max:string=rango[1]
      this.rowMin=parseInt(min)
      this.rowMax=parseInt(max)
      this.consultarVehiculos(true)
    }
  }
  removeUndefined(){
    this.allPaginas=this.allPaginas.filter(function(element){
      return element !==undefined;
    });
  }
  removeObjects(){
    if(this.vehiculosAux.length>0){
      console.log('auxlenght->'+this.vehiculosAux.length)
        var elementosRemovidos=this.vehiculosAux.splice(0, this.vehiculosAux.length);
        console.log(elementosRemovidos);
    }
  }
  setListaActual(inicio:number,final:number){
    let cont:number=0;
    for(let i=inicio;i<final;i++){
      let tmp=this.vehiculos[i];
      this.vehiculosAux[cont]=tmp;
      cont++;
    }  
  }
  public onChange(event: any): void {
      let pagina=this.selectedPaginas.split('/');
      let noPagina=pagina[0].replace("Pagina ","");
      let rango=pagina[1].split('-')
      let min:string=rango[0]
      let max:string=rango[1]
      this.rowMin=parseInt(min);
      this.rowMax=parseInt(max);
      this.paginaActual=parseInt(noPagina.replace(" ",""))
      this.consultarVehiculos(true)
    console.log('rango->'+this.rowMin+"-"+this.rowMax);
    console.log('pagina Seleccionada->'+noPagina.replace(" ",""));
  }
}
