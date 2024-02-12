import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  constructor( private countryService: CountryService ) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountry.countries;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
  }
;

  searchByCountry( query: string ): void {

    this.isLoading = true;

    this.countryService.searchCountry( query )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
