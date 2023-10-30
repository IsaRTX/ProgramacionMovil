import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  toggleValue: boolean = false;
  images: string[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarExito: boolean = false;
  mostrarError: boolean = false;
  latitude: number | undefined;
  longitude: number | undefined;
  nombreDelLugar: string | undefined;
  nombreNegocio: string = ''; 
  valor: number = 0; 
  notas: string = '';
  
  constructor(private navCtrl: NavController) {
    this.nombreDelLugar = '';
    this.images = [];
  }
  enviarDatos() {
    if (!this.nombreDelLugar || !this.nombreNegocio || this.valor <= 0 || this.images.length === 0) {
      this.mensajeError = 'Rellene los campos obligatorios y agregue al menos una imagen de la boleta.';
      this.mostrarExito = false;
      this.mostrarError = true;
    } else {
      this.mensajeExito = 'Datos enviados correctamente.';
      this.mostrarExito = true;
      this.mostrarError = false;
  
      // Limpiar campos
      this.nombreDelLugar = '';
      this.nombreNegocio = '';
      this.valor = 0;
      this.images = [];
      this.toggleValue = false;
  
      setTimeout(() => {
        this.mensajeExito = '';
        this.mensajeError = '';
        this.mostrarExito = false;
        this.mostrarError = false;
      }, 3000);
    }
  }
  

  navigateToUserPage() {
    this.navCtrl.navigateForward('usuario');
  }

  toggleChange() {
    this.toggleValue = !this.toggleValue;
  }
  
  async abrirCamara() {
    const permissions = await Camera.requestPermissions();
    if (typeof permissions.camera === 'string' && permissions.camera === 'granted') {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
        });

        const imageUrl = image?.dataUrl ?? '';

        if (imageUrl) {
          this.images.push(imageUrl);
        }
      } catch (error) {
        console.error('Error al abrir la cámara:', error);
      }
    } else {
      console.warn('Permiso de cámara denegado');
    }
  }

  getImageName(imageUrl: string): string {
    const parts = imageUrl.split('/');
    return parts[parts.length - 1];
  }

  eliminarImagen(index: number): void {
    this.images.splice(index, 1);
  }

  async agregarImagen(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const imageUrl = e.target.result as string;
            this.images.push(imageUrl);
          } else {
            console.error('Error al leer el archivo.');
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Seleccione una imagen válida.');
      }
    }
  }
  
  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
  }
  async obtenerUbicacionActual(): Promise<{ latitude: number, longitude: number }> {
    const coordinates = await Geolocation.getCurrentPosition();
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    return { latitude, longitude };
  }
  async getPlaceName(latitude: number, longitude: number, apiKey: string): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const placeName = data.results[0].formatted_address;
        return placeName;
      } else {
        return 'No se pudo obtener la información del lugar.';
      }
    } catch (error) {
      console.error('Error al obtener información del lugar: ' + error);
      return 'Error al obtener información del lugar.';
    }
  }
  async obtenerNombreLugar() {
    const apiKey = 'AIzaSyCShFjh1lVUwXAzJyQw_ylR05tn0sbOK74'; 
    const coordinates = await this.obtenerUbicacionActual();
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      this.nombreDelLugar = await this.getPlaceName(latitude, longitude, apiKey);
    }
  }
}