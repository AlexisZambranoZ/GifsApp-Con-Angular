import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'autoprefixer';
import { SearchGifsResponse, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Phoncq97XkwrnZTp96wr80wVIrPNqJRm'
  private servicioURL = 'https://api.giphy.com/v1/gifs'
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
    } 

    const params = new HttpParams().set('api_key', this.apiKey)
                                   /* .set('limit', '25') */
                                   .set('q', query)

   /*  console.log(params.toString); */

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe((res:SearchGifsResponse) => {
      console.log(res.data);
      this.resultados = res.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados))

    })

 
}
}
