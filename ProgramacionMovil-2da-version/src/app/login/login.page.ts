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
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginError = false;
    this.registroExitoso = false;

    if (this.formularioLogin.valid) {
      const credenciales = this.formularioLogin.value;
      const usuario = this.authService.obtenerUsuarioPorEmail(credenciales.email);

      if (usuario && usuario.password === credenciales.password) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/menu']);
      } else {
        console.log('Inicio de sesión fallido');
        this.loginError = true;
      }
    }
  }

  registrar() {
    this.loginError = false;

    if (this.formularioLogin.valid) {
      const usuario = this.formularioLogin.value;
      if (this.authService.verificarEmailUnico(usuario.email)) {
        this.authService.registrarUsuario(usuario);
        console.log('Usuario registrado:', usuario);
        this.registroExitoso = true;
      } else {
        console.log('El correo electrónico ya está registrado.');
      }
    }
  }
}
