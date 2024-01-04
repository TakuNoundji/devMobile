import { Component,OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Platform } from '@ionic/angular';
import { BdService } from './services/bd.service';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';

import { ToastController } from '@ionic/angular';

import { LangService } from './services/lang.service';
register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private phoneLanguage?: string;

  constructor( private bd: BdService,private toastController: ToastController,private network: Network,private translate: TranslateService, private platform: Platform, private lang: LangService) {

    this.platform.ready().then( () => {
      this.initiliazeAppsql()
    })
    this.translate.setDefaultLang('en')
  }

  ngOnInit() {
     this.phoneLanguage = this.lang.getLanguage();
    console.log('Phone Language:', this.phoneLanguage);
    // Récupérer la langue du système
    const browserLang = this.translate.getBrowserLang();

    // Utiliser la langue du système ou une langue par défaut
    this.translate.use(browserLang && browserLang.match(/en|fr/) ? browserLang : 'en');

    this.checkNetworkStatus();

    this.network.onDisconnect().subscribe(() => {
      this.checkNetworkStatus();
    });
  
    this.network.onConnect().subscribe(() => {
      this.checkNetworkStatus();
    });
}

private async checkNetworkStatus() {
  const isConnected = this.network.type !== 'none';
  console.log('Network status:', isConnected ? 'Connected' : 'Disconnected');

  const toast = await this.toastController.create({
    duration: 3000,
    position: 'top'
  });

  if (isConnected) {
    toast.message = 'Connected to the network.';
  } else {
    toast.message = 'Disconnected from the network.';
  }

  toast.present();
}





async initiliazeAppsql(){
  await this.bd.createDatabase();
  // this.bd.setIng4();
}

  async toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('colo-theme', 'dark')
      // document.body.setAttribute('span', 'white')
    }
    else {
      document.body.setAttribute('colo-theme', 'light')
    }
  }
}
