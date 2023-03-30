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
  showHistoryButton: boolean = false;

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>
  constructor(
    private gifsService: GifsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.showHistoryButton = this.gifsService.historial.length > 0;
  }
  

  get historial() {
    return this.gifsService.historial

  }

  borrarElemento() {
    this.gifsService.borrarHisotorial();
    localStorage.removeItem('historial');
    this.showHistoryButton = false;
  }
  //Re-buscar
  buscar(termino: string) {
    console.log(this.history);
    console.log("hola");
    this.gifsService.buscarGifs(termino)

  }
}

