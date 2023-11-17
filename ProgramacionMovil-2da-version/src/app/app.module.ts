import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const firebaseConfig = {
  apiKey: "AIzaSyADc9LY71lB_IOyqGD7Y2T7OD3DvDl_F6U",
    authDomain: "solarsolutions-88af9.firebaseapp.com",
    projectId: "solarsolutions-88af9",
    storageBucket: "solarsolutions-88af9.appspot.com",
    messagingSenderId: "628083495906",
    appId: "1:628083495906:web:8280a70587bd537d8e5fbb",
    measurementId: "G-H192YCEFM7"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

