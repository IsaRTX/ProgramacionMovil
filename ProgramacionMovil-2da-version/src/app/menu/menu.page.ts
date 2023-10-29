import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  toggleValue: boolean = false;
  images: string[] = [];

  constructor() {}

  toggleChange() {
    this.toggleValue = !this.toggleValue;
  }
  latitude: number | undefined;
  longitude: number | undefined;
  nombreDelLugar: string | undefined;
  
  async abrirCamara() {
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
  }

  getImageName(imageUrl: string): string {
    const parts = imageUrl.split('/');
    return parts[parts.length - 1];
  }

  eliminarImagen(index: number): void {
    this.images.splice(index, 1);
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