import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservablesAndSubjectsComponent } from './observables-and-subjects/observables-and-subjects.component';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
  path: 'obs-and-sub',
  component: ObservablesAndSubjectsComponent  
  },
  {
    path: 'operators',
    component: OperatorsComponent  
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
