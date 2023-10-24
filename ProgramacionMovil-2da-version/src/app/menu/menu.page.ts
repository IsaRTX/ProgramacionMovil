import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})

export class MenuPage implements OnInit {
  toggleValue: boolean = false;
  images: string[] = [];
  value: string = '$';
  latitud: number = -33.4489;
  longitud: number = -70.6693;
  zoom: number = 5;
  mapLoaded: boolean = false;

  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  toggleChange() {
    this.toggleValue = !this.toggleValue;
  }

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

  onValueChange(event: any) {
    const numericValue = event.replace(/[^0-9$]/g, '');

    if (numericValue !== '' && numericValue !== '$') {
      this.value = numericValue;
    }
  }
}