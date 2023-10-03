import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

// keydown es cuando la persona comienza a presionar la tecla
// keypress es cuando la tecla está presionada
// keyup es cuando la persona suelta la tecla
// keyup.enter es cuando la persona suelta la tecla enter

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5> Buscar </h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput>
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  constructor(
    // Se inyecta el servicio a usar en el constructor
    private gifService: GifService
  ) { }

  searchTag() {
    // Asigna el valor a newTag
    const newTag = this.tagInput.nativeElement.value;
    // Ejecuta el metodo del gifService para guardar el nuevo tag
    // Se manda a llamar el servicio de gifService
    this.gifService.searchTag( newTag );
    // Limpiar el input
    this.tagInput.nativeElement.value = '';
  }

}
