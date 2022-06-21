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
  modalSwitch:boolean=false
  txtVehiculo:string='';
  txtAntena:string='';

  /*Paginacion*/
  rowMin:number=1;
  rowMax:number=999;
  paginaActual:number=1;
  registrosPorPagina:number=4;
  totalVehiculos:number=0;
  totalPaginas:number=0;
  aux:number=0;
  aux2:string='';
  i2:number=1;
  allPaginas: Array<any>=[]
  allOperaciones: Array<any>= []
  allTransportistas: Array<any>=[]
  vehiculos:ListavehiculosI[]=[]
  vehiculosAux:ListavehiculosI[]=[]

  selectedOper: string='';
  selectedTrans: string='';
  selectedStatus: string='';
  selectedPaginas: string='';

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
   
    this.getOperaciones();
    this.getTransportistas();
    this.consultarVehiculos(false);
  }
  agregarVehiculo() {
    this.modalSS.$visible.emit(1);
  }
  getOperaciones(){
    this.transportesService.getOperaciones().subscribe((resp:any) =>{
      this.allOperaciones = resp;    
      })
  }
  getTransportistas(){
    this.transportesService.getTransportistas().subscribe((resp:any) =>{
      this.allTransportistas = resp;    
    })
  }
  getVehiculos(operacion:string,transportista:string,vehiculo:string,antena:string,status:string,paginado:boolean){
      this.transportesService.getVehiculos(operacion,transportista,vehiculo,antena,status,this.rowMin,this.rowMax).subscribe((resp:any) =>{
      this.vehiculos = resp;    
      this.totalVehiculos = this.vehiculos.length;
      if(!paginado){
        this.totalPaginas = this.calculaNoPaginas()
        this.calculaDivisionPaginas()
        this.setListaActual(0,this.registrosPorPagina);
      }else{
        this.removeObjects();
        this.setListaActual(this.rowMin-1,this.rowMax);
      }
    })
  }

  updateVehiculo(code: number,operacion: string){
   /* const w = 1050;
    const h = 400;
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/agregar-vehiculo'])
    );

    window.open(url, '_blank', 'resizable=true", toolbar=no, scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);*/
    this.modalSS.$visible.emit(1);
  }
  deleteVehiculo(code: number,operacion: string){
  }
  detailVehiculo(code: number, operacion: string){
  }
  consultarVehiculos(paginado:boolean){
    this.getVehiculos(this.selectedOper,this.selectedTrans,this.txtVehiculo,this.txtAntena,this.selectedStatus,paginado);
  }
  calculaNoPaginas():number{
    return Math.round(this.totalVehiculos/this.registrosPorPagina);
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
