import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { SwitchService } from '../service/switch.service';
import { ModalService } from '../../../../_modal';
import { ListaantenasI } from '../../../model/antenas.interface';
import { TransportesServiceService } from '../../../services/transportes-service.service';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss']
})
export class AgregarVehiculoComponent implements OnInit {
  txtFiltroAntena: string =''
  txtFiltroAntena2: string =''
  bodyText: string=''

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
      veh: ['',Validators.required],
      antena:['',Validators.required],
      antena2:['',Validators.required]
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
    this.buscarAntenas(false)
    this.buscarAntenas2(false)
  }
  guardar(): void {
    if( this.addVehFormFb.valid) {
     
    }else{
      alert('Unos o mas campos obligatorios(*) estan vacios!')
    }
   // this.modalSS.$visible.emit(0);
  }
  buscarAntenas(paginado:boolean){
    this.transportesService.getAntenas(this.txtFiltroAntena).subscribe((resp:any) =>{
      this.antenas = resp;    
      this.totalAntenas = this.antenas.length;
      if(!paginado){
        this.totalPaginas = this.calculaNoPaginas(this.totalAntenas)
        this.calculaDivisionPaginas(this.totalAntenas)
        this.setListaActual(0,this.registrosPorPagina);
      }else{
        this.removeObjects();
        this.setListaActual(this.rowMin-1,this.rowMax);
      }
    })
  } 
  buscarAntenas2(paginado:boolean){
    this.transportesService.getAntenas(this.txtFiltroAntena2).subscribe((resp:any) =>{
      this.antenas2 = resp;    
      this.totalAntenas2 = this.antenas2.length;
      if(!paginado){
        this.totalPaginas2 = this.calculaNoPaginas2(this.totalAntenas2)
        this.calculaDivisionPaginas2(this.totalAntenas2)
        this.setListaActual2(0,this.registrosPorPagina2);
      }else{
        this.removeObjects2();
        this.setListaActual2(this.rowMin2-1,this.rowMax2);
      }
    })
  }
  cancelar(){
    this.modalSS.$visible.emit(0);
  }
  selecAntena(antenaSel:string){
    this.antenaControl.setValue(antenaSel);
    this.closeModal('custom-modal-1');
  }
  selecAntena2(antenaSel:string){
    this.antenaControl2.setValue(antenaSel);
    this.closeModal('custom-modal-2');
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    
  }

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
/* Paginacion antenas 1  */


}
