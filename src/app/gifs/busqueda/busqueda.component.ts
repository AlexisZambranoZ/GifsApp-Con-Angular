import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  history = this.gifsService.historial
  showHistorial = false

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.buscarGif('hola')
    this.borrarElemento()
  }

  get historial() {
    return this.gifsService.historial
    
  }
  constructor(
    private gifsService: GifsService,
    private snackbar: MatSnackBar
  ) {

  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value

    if (valor.trim().length === 0) {
      return
    }
    this.showHistorial = true
    console.log(this.history);
    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = ""
  }

  buscarGif(termino: string) {
    this.gifsService.buscarGifs(termino)

  }

  borrarElemento() {
    this.showHistorial = false
    this.gifsService.borrarHisotorial()
    localStorage.removeItem('historial');

  }

}
