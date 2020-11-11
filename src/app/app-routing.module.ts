import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AutenticacionGuard } from './services/autenticacion.guard';


const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: '', component: WelcomeComponent, canActivate: [AutenticacionGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
