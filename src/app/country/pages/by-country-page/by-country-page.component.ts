import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  constructor( private countryService: CountryService ) {};

  public countries: Country[] = [];

  searchByCountry( query: string ): void {

    this.countryService.searchCountry( query )
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
