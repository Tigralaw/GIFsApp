import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    // Se inyecta el servicio en el constructor
    private gifService: GifService ) { }


  public get tags() {
    // Se manda a llamar el getter de la lista del historial privado que está
    // en el service
    return this.gifService.tagsHistory;
  }

  public searchTag( tag: string ) {
    return this.gifService.searchTag( tag );
  }


}
