import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAlumnoPage } from './registrar-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAlumnoPageRoutingModule {}
