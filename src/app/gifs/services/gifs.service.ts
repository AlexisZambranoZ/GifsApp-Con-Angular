import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'autoprefixer';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Phoncq97XkwrnZTp96wr80wVIrPNqJRm'
  private _historial: string[] = []
  resultados: Gif[] = []

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
  ) {
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

     /* if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!)
     } */
  }

  ngOnInit(): void {
 
    this.resultados[0].images.downsized_medium
  }

  get historial() {
    return [...this._historial]
  }


  buscarGifs(query: string) {

    query = query.trim().toLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('historial',JSON.stringify(this.historial))

    } else {
      this.snackbar.open('Busqueda repetida', 'Cerrar');
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=Phoncq97XkwrnZTp96wr80wVIrPNqJRm&q= ${query}`)
    .subscribe((res:SearchGifsResponse) => {
      console.log(res.data);
      this.resultados = res.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados))

    })

 
}
}
