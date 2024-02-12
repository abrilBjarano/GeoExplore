import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountryService {

  constructor( private http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: []},
    byCountry: { term: '', countries: []},
    byRegion: { region: '', countries: []},
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore) );
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')!  );
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      // Para cuando busquemos un resultado que no existe
      .pipe(
        // Atrapa el error y lo convierte en un arreglo vacío
        catchError( () => of([]) ),
        // Para hacer esperar el resultado y que se vea el LazySpinner
        // delay(500),
      );
  }


  searchCapital( term: string): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = {  term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }


  searchCountry( term: string ): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCountry = {  term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }


  searchRegion( region: Region ): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cacheStore.byRegion = {  region, countries }),
      tap( () => this.saveToLocalStorage() )
    );
  }


  searchCountryByAlphaCode( query: string ): Observable<Country | null> {

    const url: string = `${ this.apiUrl }/alpha/${ query }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) ),
        tap( () => this.saveToLocalStorage() )
      );
  }

}
