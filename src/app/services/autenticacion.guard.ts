import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private servicio: EndpointService, private router: Router) { }

  canActivate(): boolean {

    if (!this.servicio.statusValue) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
