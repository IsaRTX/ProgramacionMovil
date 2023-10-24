// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuariosRegistrados: any[] = []; // Almacenar usuarios registrados (simulación)

  registrarUsuario(usuario: any): void {
    // Aquí puedes agregar lógica para guardar el usuario en una base de datos o almacenamiento local
    this.usuariosRegistrados.push(usuario);
  }

  verificarCredenciales(credenciales: any): boolean {
    // Aquí puedes agregar lógica para verificar las credenciales, como consultar una base de datos
    const usuario = this.usuariosRegistrados.find((u) => u.nombre === credenciales.nombre);
    return usuario && usuario.password === credenciales.password;
  }
}
