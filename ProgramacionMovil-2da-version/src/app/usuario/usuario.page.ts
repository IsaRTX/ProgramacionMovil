import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage {
  imagenPerfil: string = 'assets/default-profile-image.png'; // Ruta de la imagen de perfil por defecto
  nombreCompleto: string = 'John Doe'; // Puedes obtener el nombre desde tu servicio de autenticación
  correoElectronico: string = 'john.doe@example.com'; // Puedes obtener el correo desde tu servicio de autenticación
  editMode: boolean = false;

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  cargarImagenPerfil(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imagenPerfil = e.target.result as string;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  

  editarUsuario() {
    this.editMode = !this.editMode;
  }
}
