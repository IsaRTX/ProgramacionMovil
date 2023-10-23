import { Component } from '@angular/core';

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
}
