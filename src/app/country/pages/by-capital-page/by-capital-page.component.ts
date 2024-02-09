import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  constructor( private countryService: CountryService) {};

  public countries: Country[] = [];

  searchByCapital( query: string ): void {

      this.countryService.searchCapital( query )
        .subscribe( countries => {
        this.countries = countries;
      })
  }

}
