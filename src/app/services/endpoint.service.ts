import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  status: boolean;

  constructor(private http: HttpClient, private route: Router) { this.status = false; }

  comprobarUser(user: string, pass: string) {
    return this.http.get(`http://3.15.92.223:5050/api/Login?userName=${user}&password=${pass}`);
  }

  get statusValue(): boolean {
    return this.status;
  }

  navigate_component(value) {
    this.status = value;
    this.route.navigate(['/']);
  }

}
