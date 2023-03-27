import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  constructor(
    private gifsService: GifsService,
    private snackbar: MatSnackBar
  ) {

  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value
   
    if (valor.trim().length === 0) {
      this.snackbar.open('Busqueda vacia', 'Cerrar');
      return
    } 

    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = ""
  }

}
