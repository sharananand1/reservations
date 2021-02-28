import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from './components/form/form.component';
import {ManagerComponent} from './components/manager/manager.component';

const routes: Routes = [
  {path: 'book-now', component: FormComponent},
  {path: '', component: ManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
