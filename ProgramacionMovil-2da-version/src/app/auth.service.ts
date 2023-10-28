// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuariosRegistrados: any[] = [];

  verificarCredenciales(credenciales: any): boolean {
    const usuario = this.usuariosRegistrados.find((u) => u.nombreUsuario === credenciales.nombreUsuario && u.password === credenciales.password);
    return !!usuario;
  }

  registrarUsuario(usuario: any): void {
    this.usuariosRegistrados.push(usuario);
  }

  verificarNombreUsuarioUnico(nombreUsuario: string): boolean {
    return !this.usuariosRegistrados.some((usuario) => usuario.nombreUsuario === nombreUsuario);
  }
}
