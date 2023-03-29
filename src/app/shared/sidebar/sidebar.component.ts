import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showHistory: boolean = false
  history = this.gifsService.historial


  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>
  constructor(
    private gifsService: GifsService,
    private snackbar: MatSnackBar
  ) { }



  get historial() {
    return this.gifsService.historial

  }

  borrarElemento() {
    this.showHistory = false
    this.gifsService.borrarHisotorial()
    localStorage.removeItem('historial');

  }
  //Re-buscar
  buscar(termino: string) {
    console.log(this.history);
    console.log("hola");
    this.gifsService.buscarGifs(termino)

  }
}

