import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  constructor( private countryService: CountryService ) {};

  public countries: Country[] = [];

  searchByRegion( query: string ): void {

    this.countryService.searchRegion( query )
      .subscribe( countries => {
        this.countries = countries;
      })
  }

}
