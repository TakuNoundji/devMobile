import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import{ Drivers} from '@ionic/storage'

import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';

// import { Network } from '@capacitor/core';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Platform } from '@ionic/angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient} from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, 
    IonicStorageModule.forRoot({
    name:"quizzBd",
    driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB]
  }), 
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SocialSharing,Network],
  bootstrap: [AppComponent],
})
export class AppModule {}
