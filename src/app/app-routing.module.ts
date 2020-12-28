import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from './components/form/form.component';
import {CongratsComponent} from './components/congrats/congrats.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'congrats', component: CongratsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
