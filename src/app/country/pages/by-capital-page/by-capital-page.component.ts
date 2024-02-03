import { Component } from '@angular/core';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public capital: string = '';

  searchByCapital( event: string ): void {
    console.log( event );

  }

}
