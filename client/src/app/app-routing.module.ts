import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { NewpetComponent } from './newpet/newpet.component'
import { DetailsComponent } from './details/details.component'
import { EditpetComponent } from './editpet/editpet.component'

const routes: Routes = [
	{path: '',redirectTo: '/pets', pathMatch: 'full'},
	{path: 'pets', component: HomeComponent},
	{path: 'pets/new', component: NewpetComponent},
	{path: 'pets/:id', component: DetailsComponent},
	{path: 'pets/:id/edit', component: EditpetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
