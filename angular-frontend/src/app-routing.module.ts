import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route for home
  { path: '**', redirectTo: '' }, // Redirect for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
