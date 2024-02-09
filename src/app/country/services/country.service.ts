import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  constructor( private http: HttpClient ) { }


  private apiUrl: string = 'https://restcountries.com/v3.1';


  searchCapital( query: string): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/capital/${ query }`;

    return this.http.get<Country[]>( url )
    // Para cuando busquemos un resultado que no existe
      .pipe(
        // Atrapa el error y lo convierte en un arreglo vacío
        catchError( () => of([]) )
      );

  }


  searchCountry( query: string ): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/name/${ query }`;

    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }


  searchRegion( query: string ): Observable<Country[]> {

    const url: string = `${ this.apiUrl }/region/${ query }`;

    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }


  searchCountryByAlphaCode( query: string ): Observable<Country | null> {

    const url: string = `${ this.apiUrl }/alpha/${ query }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

}
