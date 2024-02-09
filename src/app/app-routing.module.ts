import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    // Aqui es donde se importa y exporta el routing child, y se importa el modulo, no el routing.module
    loadChildren: () => import('./country/country.module').then( m => m.CountryModule )
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
