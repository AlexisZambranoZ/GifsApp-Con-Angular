import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>
  constructor(
    private gifsService : GifsService,
    private snackbar: MatSnackBar
  ){}

  get historial(){
    return this.gifsService.historial

  }

  borrarElemento() {
    localStorage.removeItem('historial');
  }

  buscar(termino: string) {
    /* console.log(termino); */
    this.gifsService.buscarGifs(termino)
  
  }

  buscargif() {
    const valor = this.txtBuscar.nativeElement.value
   
    if (valor.trim().length === 0) {
      this.snackbar.open('Busqueda vacia', 'Cerrar');
      return
    } 

    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = ""
  }

}

