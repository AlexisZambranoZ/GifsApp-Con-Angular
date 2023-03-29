import { Component, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {



  @ViewChild(MatPaginator) paginator!: MatPaginator;




  get resultados(){
    return this.gifsService.resultados
  }

  constructor(
    private gifsService: GifsService,
    private http: HttpClient){

  }


  descargarGif(url: string) {
    this.http.get(url, { responseType: 'blob' })
      .subscribe((gifBlob: Blob) => {
        const urlGif = URL.createObjectURL(gifBlob);
  
        const link = document.createElement('a');
        link.href = urlGif;
        link.target = '_blank';
        link.download = 'gif.gif';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        URL.revokeObjectURL(urlGif);
      });
  }
 
  
  
}
