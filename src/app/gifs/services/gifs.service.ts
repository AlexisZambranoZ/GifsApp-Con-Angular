import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []

  constructor(
    private snackbar: MatSnackBar
  ) { }


  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
    } else {
      this.snackbar.open('Busqueda repetida', 'Cerrar');
    }

    this._historial = this._historial.splice(0, 10)
    console.log(this._historial);
  }

}
