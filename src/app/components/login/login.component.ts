import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointService } from '../../services/endpoint.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formularioLogin: FormGroup;
  mostrarMensaje: boolean;
  cargando: boolean;

  constructor(private fb: FormBuilder, private svEndpoint: EndpointService) {
    this.mostrarMensaje = false;
    this.cargando = false;
    this.createForm();
  }

  mostrarPass() {
    const boton: any = document.getElementById('see_password');

    (boton.type === "password") ? boton.type = "text": boton.type = "password";
  }

  createForm() {
    this.formularioLogin = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      password: ['', [
        Validators.required // pueden ir mas validaciones, dependiendo de los requerimientos
      ]],
    });
  }

  get userNameNoValido() {
    return this.formularioLogin.get('username').invalid && this.formularioLogin.get('username').touched;
  }

  get passWordNoValido() {
    return this.formularioLogin.get('password').invalid && this.formularioLogin.get('password').touched;
  }

  login() {
    if (this.formularioLogin.invalid) {
      return Object.values(this.formularioLogin.controls).forEach(input => {
        input.markAsTouched();
      });
    }

    this.formularioLogin.disable();
    // realizo peticion al endpoint
    this.cargando = true;
    this.svEndpoint.comprobarUser(this.formularioLogin.value['username'], this.formularioLogin.value['password'])
    .subscribe((respuesta: boolean) => {
      this.formularioLogin.reset();
      this.formularioLogin.enable();
      this.cargando = false;
      (respuesta === true) ? this.svEndpoint.navigate_component(true) :  this.mostrarMensaje = true;
    });

    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 4000);

  }

}
