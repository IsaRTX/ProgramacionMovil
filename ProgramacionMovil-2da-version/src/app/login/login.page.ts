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
  loginError: boolean = false;
  registroExitoso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioLogin = this.fb.group({
      nombreUsuario: ['', Validators.required], // Cambiado a nombreUsuario
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginError = false; // Restablecer el estado de error
    this.registroExitoso = false; // Restablecer el estado de confirmación

    if (this.formularioLogin.valid) {
      const credenciales = this.formularioLogin.value;
      if (this.authService.verificarCredenciales(credenciales)) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/menu']);
      } else {
        console.log('Inicio de sesión fallido');
        this.loginError = true;
      }
    }
  }

  registrar() {
    this.loginError = false; // Restablecer el estado de error

    if (this.formularioLogin.valid) {
      const usuario = this.formularioLogin.value;
      this.authService.registrarUsuario(usuario);
      console.log('Usuario registrado:', usuario);
      this.registroExitoso = true;
    }
  }
}

