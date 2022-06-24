import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { SwitchService } from '../service/switch.service';
import { ModalService } from '../../../../_modal';
import { ListaantenasI } from '../../../model/antenas.interface';
import { TransportesServiceService } from '../../../services/transportes-service.service';
import { ListatiposvehiculosI } from '../../../model/tiposVehiculos.interface';
import { ListavehiculosI } from '../../../model/vehiculos.Interface';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss']
})
export class AgregarVehiculoComponent implements OnInit {
  vehObject:ListavehiculosI[]=[]
  clave:string='';
  txtFiltroAntena: string ='%'
  txtFiltroAntena2: string ='%'

  bodyText: string=''

  
  selectedTrans: any
  selectedTiposVeh: any
  selectedPlataformas: any
  selectedPlataformas2: any
  selectedOperador: any

  allOperaciones: Array<any>= []
  allTransportistas: Array<any>=[]
  allTiposVehiculos: Array<any>=[]
  allPlataformas: Array<any>=[]
  allPlataformas2: Array<any>=[]
  allOperadores: Array<any>=[]

  plataforma1:string=''
  plataforma2:string=''

  /*Paginacion*/
  rowMin:number=1;
  rowMax:number=999;
  paginaActual:number=1;
  registrosPorPagina:number=4;
  totalAntenas:number=0;
  totalPaginas:number=0;
  aux:number=0;
  aux2:string='';
  i2:number=1;
  allPaginas: Array<any>=[]
  selectedPaginas: string='';
  antenas:ListaantenasI[]=[]
  antenasAux:ListaantenasI[]=[]
  /*Paginacion 2*/
  rowMin2:number=1;
  rowMax2:number=999;
  paginaActual2:number=1;
  registrosPorPagina2:number=4;
  totalAntenas2:number=0;
  totalPaginas2:number=0;
  aux_2:number=0;
  aux22:string='';
  i22:number=1;
  allPaginas2: Array<any>=[]
  selectedPaginas2: string='';
  antenas2:ListaantenasI[]=[]
  antenasAux2:ListaantenasI[]=[]

  addVehFormFb =  this.fb.group({
    antena:['',Validators.required],
    antena2:['',Validators.required],
    arrendado:[''],
    //arrendadoDesc
    //code
    color:[''],
    descripcion:['',Validators.required],
    iave:['',Validators.required],
    marca: [''],
    //marca motor
    modelo:[''],
    //modelo motor
    no_ejes:['',Validators.required],
    num_motor:[''],
    num_serie:['',Validators.required],
    operacion: ['',Validators.required],
    //operacion desc
    operador: [0],
    //operador_nombre
    permiso_federal:['',Validators.required],
    peso:['',Validators.required],
    placas:['',Validators.required],
    plataforma:['',Validators.required],
    plataforma2:['',Validators.required],
    status:['',Validators.required],
    //status_desc
    tipo:[''],
    tipo_permiso:[''],
    transportista:['',Validators.required],
    //transportista_nombre
    vehiculo: ['',Validators.required]
   
  })

  get vehControl(): FormControl {
    return this.addVehFormFb.get('veh') as FormControl;
  }
  get antenaControl(): FormControl {
    return this.addVehFormFb.get('antena') as FormControl;
  }
  get antenaControl2(): FormControl {
    return this.addVehFormFb.get('antena2') as FormControl;
  }
  constructor(
    private fb: FormBuilder,
    private modalSS: SwitchService,
    private modalService: ModalService,
    private transportesService: TransportesServiceService) { 
    document.body.className = "popup";
  }

  ngOnInit(): void {
    this.modalSS.enviaCode.subscribe(data =>{
      //console.log('recibiendo data->'+data)
    })
    this.getOperaciones()
    this.getTransportistas('%')
    this.getTiposVehiculos()
    this.getPlataformas();
    this.getPlataformas2();
    this.getOperadores();
    this.cargaDatosSeleccionados()
  }
  /*<< seccion llena Selects>>*/
  getOperaciones(){
    this.transportesService.getOperaciones().subscribe((resp:any) =>{
      this.allOperaciones = resp.data    
      })
  }
  selectChangeHandlerOper (event: any) {
    let operValue = event.target.value;
    console.log('operacion->'+operValue);
    this.getTransportistas(String(operValue)==='undefined'?'%':operValue)
  }
  getTransportistas(operacion:string){
    this.transportesService.getTransportistas(operacion).subscribe((resp:any) =>{
      this.allTransportistas = resp.data;    
    })
  }
  selectChangeHandlerTrans (event: any) {
    let transValue = event.target.value;
    console.log('transportista->'+transValue);
  }
  getTiposVehiculos(){
    this.transportesService.getTiposVehiculo().subscribe((resp:any) =>{
      this.allTiposVehiculos = resp.data;
    })
  }
  getPlataformas(){
    this.transportesService.getPlataformas().subscribe((resp:any) =>{
      this.allPlataformas =  resp.data;
    })
  }
  selectChangeHandlerPlat1 (event: any) {
    let plat1 = event.target.value;
    
    this.plataforma1=plat1;
    console.log('plat1->'+this.plataforma1);
    this.buscarAntenas(false)
  }
  getPlataformas2(){
    this.transportesService.getPlataformas().subscribe((resp:any) =>{
      this.allPlataformas2 =  resp.data;
    })
  }
  selectChangeHandlerPlat2 (event: any) {
    let plat2 = event.target.value;
    this.plataforma2=plat2
    console.log('plat2->'+this.plataforma2);
    this.buscarAntenas2(false)
  }
  getOperadores(){
    this.transportesService.getOperadores("%","%","%","%","%","%").subscribe((resp:any) =>{
      this.allOperadores = resp.data;
    })
  }
  /*<< seccion llena Selects>>*/
  /* <<Seccion  Antenas>> */ 
  buscarAntenas(paginado:boolean){
      if(paginado){
        this.removeObjects();
        this.setListaActual(this.rowMin-1,this.rowMax);
      }else{
          this.transportesService.getAntenas(this.txtFiltroAntena,this.plataforma1).subscribe((resp:any) =>{
          this.antenas = resp.data;    
          this.totalAntenas = this.antenas.length;
          let max=this.totalAntenas>this.registrosPorPagina?this.registrosPorPagina:this.totalAntenas;
          this.totalPaginas = this.calculaNoPaginas(this.totalAntenas)
          this.calculaDivisionPaginas(this.totalAntenas)
          this.setListaActual(0,max);
          })
      }
  } 
  buscarAntenas2(paginado:boolean){
      if(paginado){
        this.removeObjects2();
        this.setListaActual2(this.rowMin2-1,this.rowMax2);
      }else{
          this.transportesService.getAntenas(this.txtFiltroAntena2,this.plataforma2).subscribe((resp:any) =>{
          this.antenas2 = resp.data;    
          this.totalAntenas2 = this.antenas2.length;
          let max=this.totalAntenas2>this.registrosPorPagina?this.registrosPorPagina:this.totalAntenas2;
          this.totalPaginas2 = this.calculaNoPaginas2(this.totalAntenas2)
          this.calculaDivisionPaginas2(this.totalAntenas2)
          this.setListaActual2(0,max);
          })
      }
  }
  selecAntena(antenaSel:string){
    this.antenaControl.setValue(antenaSel);
    this.closeModal('custom-modal-1');
  }
  selecAntena2(antenaSel:string){
    this.antenaControl2.setValue(antenaSel);
    this.closeModal('custom-modal-2');
  }
    /* <<Seccion  Antenas>> */ 
    /* <<seccion Modal>>*/
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    
  }
  /* <<seccion Modal>>*/
  cargaDatosSeleccionados(){
    let code:string
    this.modalSS.enviaCode.subscribe(data =>{
      code=data
      console.log('codigo para buscar->'+code)
      this.transportesService.getVehiculo(code).subscribe((resp:any) =>{
        let veh:ListavehiculosI=resp.data[0] as ListavehiculosI
        console.log('objeto->'+JSON.stringify(veh))
        console.log('veh->'+veh.color)
        //this.form.controls['dept'].setValue(selected.id);
        this.addVehFormFb.controls['color'].setValue(veh.color) 
      })
    })
  }
  /* <<seccion Eventos>> */ 
  guardar(): void {
    if( this.addVehFormFb.valid) {
      let vehiculo:ListavehiculosI= this.addVehFormFb.value
      console.log('objeto->'+JSON.stringify(vehiculo))
      this.transportesService.crearVehiculo(vehiculo).subscribe((resp:any) =>{
      console.log(resp)
     })
      alert('Vehiculo creado exitosamente');
      this.modalSS.$visible.emit(0);
    }else{
      alert('Unos o mas campos obligatorios(*) estan vacios!')
    }
  }

  cancelar(){
    this.modalSS.$visible.emit(0);
  }
  /* <<seccion Eventos>> */ 
  /*Paginacion_ antenas 1__________________________________________________________________*/
  calculaNoPaginas(total:number):number{
    return Math.round(total/this.registrosPorPagina);
  }
  calculaDivisionPaginas(total:number){
    this.allPaginas=[]
    this.aux=0;
    this.aux2='';
    this.i2=1;
   for (let i = 1; i <= this.totalPaginas; i++) {
      this.aux = Math.round(this.registrosPorPagina * i);
      this.aux2 = "Pagina " + i + " /" + this.i2 + "-" + this.aux;
      if (i == this.totalPaginas) {
        this.aux2 = "Pagina " + i + " /" + this.i2 + "-" + total;
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
      this.buscarAntenas(true) 
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
      this.buscarAntenas(true)
    }
  }
  removeUndefined(){
    this.allPaginas=this.allPaginas.filter(function(element){
      return element !==undefined;
    });
  }
  removeObjects(){
    if(this.antenasAux.length>0){
        var elementosRemovidos=this.antenasAux.splice(0, this.antenasAux.length);
        console.log(elementosRemovidos);
    }
  }
  setListaActual(inicio:number,final:number){
    let cont:number=0;
    for(let i=inicio;i<final;i++){
      let tmp=this.antenas[i];
      this.antenasAux[cont]=tmp;
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
    this.buscarAntenas(true)
  console.log('rango->'+this.rowMin+"-"+this.rowMax);
  console.log('pagina Seleccionada->'+noPagina.replace(" ",""));
  }
/* Paginacion antenas 1  */
 /*Paginacion antenas 2__________________________________________________________________*/
 calculaNoPaginas2(total:number):number{
  return Math.round(total/this.registrosPorPagina2);
}
calculaDivisionPaginas2(total:number){
  this.allPaginas2=[]
  this.aux_2=0;
  this.aux22='';
  this.i22=1;
 for (let i = 1; i <= this.totalPaginas2; i++) {
    this.aux_2 = Math.round(this.registrosPorPagina2 * i);
    this.aux22 = "Pagina " + i + " /" + this.i22 + "-" + this.aux_2;
    if (i == this.totalPaginas2) {
      this.aux22 = "Pagina " + i + " /" + this.i22 + "-" + total;
    }
  this.allPaginas2[i]=this.aux22;
  this.i22+= this.registrosPorPagina2;
  }
  
  this.removeUndefined2();
  this.selectedPaginas2 = this.allPaginas2[0];
 
 
}
pagAnterior2(){
  if(this.paginaActual2==1){
    console.log('no hago nada estoy en el inicio');
  }else{
    this.paginaActual2--
    this.selectedPaginas2=this.allPaginas2[this.paginaActual2-1];
    let pagina=this.selectedPaginas2.split('/')
    let rango=pagina[1].split('-')
    let min:string=rango[0]
    let max:string=rango[1]
    this.rowMin2=parseInt(min);
    this.rowMax2=parseInt(max);
    this.buscarAntenas2(true) 
  }
}
pagSiguiente2(){
  if(this.paginaActual2==this.totalPaginas2){
    console.log('no hago nada estoy en el final');
  }else{
    this.paginaActual2++
    this.selectedPaginas2=this.allPaginas2[this.paginaActual2-1];
    let pagina=this.selectedPaginas2.split('/')
    let rango=pagina[1].split('-')
    let min:string=rango[0]
    let max:string=rango[1]
    this.rowMin2=parseInt(min)
    this.rowMax2=parseInt(max)
    this.buscarAntenas2(true)
  }
}
removeUndefined2(){
  this.allPaginas2=this.allPaginas2.filter(function(element){
    return element !==undefined;
  });
}
removeObjects2(){
  if(this.antenasAux2.length>0){
      var elementosRemovidos=this.antenasAux2.splice(0, this.antenasAux2.length);
      console.log(elementosRemovidos);
  }
}
setListaActual2(inicio:number,final:number){
  let cont:number=0;
  for(let i=inicio;i<final;i++){
    let tmp=this.antenas2[i];
    this.antenasAux2[cont]=tmp;
    cont++;
  }  
}
public onChange2(event: any): void {
  let pagina=this.selectedPaginas2.split('/');
  let noPagina=pagina[0].replace("Pagina ","");
  let rango=pagina[1].split('-')
  let min:string=rango[0]
  let max:string=rango[1]
  this.rowMin2=parseInt(min);
  this.rowMax2=parseInt(max);
  this.paginaActual2=parseInt(noPagina.replace(" ",""))
  this.buscarAntenas2(true)
console.log('rango->'+this.rowMin2+"-"+this.rowMax2);
console.log('pagina Seleccionada->'+noPagina.replace(" ",""));
}
/* Paginacion antenas 2  */


}
