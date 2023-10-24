// login.page.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioLogin = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Método para iniciar sesión
  login() {
    if (this.formularioLogin.valid) {
      const credenciales = this.formularioLogin.value;
      if (this.authService.verificarCredenciales(credenciales)) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/menu']);
      } else {
        console.log('Inicio de sesión fallido');
      }
    }
  }

  // Método para registrar un nuevo usuario
  registrar() {
    if (this.formularioLogin.valid) {
      const usuario = this.formularioLogin.value;
      this.authService.registrarUsuario(usuario);
      console.log('Usuario registrado:', usuario);
    }
  }
}
