import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'GIRnWry3t5k4YtJVQ0wsvGypW43BR0su';
// El provideIn: ´root' hace que el servicio GifService esté disponible
// a lo largo de toda la aplicación y todos los módulos que inyecten
// el servicio
@Injectable({ providedIn: 'root' })
export class GifService {

  // Lista de gifssegun la petición
  public gifList: Gif[] = [];

  // Historial de tags
  private _tagsHistory: string[] = [];
  private apiKey:       string   = GIPHY_API_KEY;
  private serviceUrl:   string   = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ){
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

  }

  // Se crea un getter para poder tener acceso al historial desde otras clases
  public get tagsHistory() {
    // Crea una copia del arreglo _tagsHistory
    return [...this._tagsHistory];
  }
  // Método para validar los elementos que se ingre
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    // Si en el historial se encuentra el nuevo texto ingresado
    // y usar filter para devolver un nuevo arreglo validando la condiciones indicadas,
    // regresando en este nuevo arreglo solo los elementos que cumplen la/s condicione/es.
    // En resumen, este if sirve para borrar el elemento duplicado y luego se añade
    // al inicio de la búsqueda con el unshift.
    if ( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }
    this._tagsHistory.unshift( tag );
    // Mantiene el historial con las 10 búsquedas más recientes
    // splice corta el arreglo y mantiene solo lo que hay desde
    // la longitud 0 a la 10.
    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalStorage();

  }

  // Guardar en localStorage
  private saveLocalStorage():void {
    // JSON.stringyfy convierte un objeto en un string
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')!);
    // Si no hay nada en el historial no hacer nada
    // si hay algo en el historial, cargar la búsqueda más reciente
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag( tag: string ):Promise<void> {
    // Si no se ingresa un caracter y se presiona enter,
    // no agregar ningún elemento a la lista
    if ( tag.length === 0 ) return;

    // Validaciones
    this.organizeHistory(tag);
    // Parámetros o query params
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10' )
    .set('q', tag )

    // PETICIÓN A LA API
    // Aquí se realiza la petición a la API de los gifs
    // estamos recibiendo información de lo que emite el observable
    // el método subscribe hace que estemos escuchando y a la
    // espera de que el servicio emita alguna acción.
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
    .subscribe( resp => {

      this.gifList = resp.data;
      console.log({ gifs: this.gifList });

    })

  }



}
