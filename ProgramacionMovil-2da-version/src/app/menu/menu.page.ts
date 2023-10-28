import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {
  toggleValue: boolean = false; // Inicializamos como falso (desactivado)

  constructor() {}

  toggleChange() {
    this.toggleValue = !this.toggleValue;
  }
  latitude: number | undefined;
  longitude: number | undefined;
  nombreDelLugar: string | undefined; // Variable para almacenar el nombre del lugar

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
  
  // Luego, al llamar a la función obtenerNombreLugar, pásale la apiKey
  async obtenerNombreLugar() {
    const apiKey = 'AIzaSyCShFjh1lVUwXAzJyQw_ylR05tn0sbOK74'; // Reemplaza con tu clave de API
    const coordinates = await this.obtenerUbicacionActual();
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      this.nombreDelLugar = await this.getPlaceName(latitude, longitude, apiKey);
    }
  }
}
