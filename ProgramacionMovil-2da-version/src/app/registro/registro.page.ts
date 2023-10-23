// registro.page.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrarUsuario() {
    if (this.formularioRegistro.valid) {
      const usuario = this.formularioRegistro.value;

      // Verificar que las contraseñas coincidan
      if (usuario.password === usuario.confirmPassword) {
        this.authService.registrarUsuario(usuario);
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      } else {
        console.log('Las contraseñas no coinciden.');
      }
    }
  }
}
