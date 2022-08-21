import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './user/form/form.component';
import { ViewComponent } from './user/view/view.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: '**',
    redirectTo: 'view'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
