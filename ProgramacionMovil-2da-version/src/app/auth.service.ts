// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuariosRegistrados: any[] = [];

  verificarCredenciales(credenciales: any): boolean {
    const usuario = this.usuariosRegistrados.find(
      (u) => u.correoElectronico === credenciales.email && u.password === credenciales.password
    );
    return !!usuario;
  }
  

  registrarUsuario(usuario: any): void {
    // Antes de registrar al usuario, verifica que el correo electrónico no esté duplicado
    if (!this.verificarEmailUnico(usuario.email)) {
      console.log('El correo electrónico ya está registrado.');
      return;
    }
    
    this.usuariosRegistrados.push(usuario);
  }

  verificarEmailUnico(email: string): boolean {
    return !this.usuariosRegistrados.some((usuario) => usuario.email === email);
  }

  // Agrega una función para obtener un usuario por su correo electrónico
  obtenerUsuarioPorEmail(email: string): any {
    return this.usuariosRegistrados.find((usuario) => usuario.email === email);
  }
  
  verificarNombreUsuarioUnico(correoElectronico: string): boolean {
    return !this.usuariosRegistrados.some((usuario) => usuario.correoElectronico === correoElectronico);
  }
  
}
