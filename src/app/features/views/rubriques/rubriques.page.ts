import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BdService } from '../../../services/bd.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
// import { Network } from '@capacitor/core';
// import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.page.html',
  styleUrls: ['./rubriques.page.scss'],
})
export class RubriquesPage implements OnInit {
  categories: any[] = [];
  isConnected: boolean = true;
  nbre_joueurs:any

  constructor(
    // private networkService: NetworkService,
    private toastController: ToastController,
    private bd: BdService,
    private router: Router,
    private storage: Storage
  ) {
    // Appel de la méthode handleNetwork
    // this.handleNetwork();

    // this.getNetworkStatus();
  }

  // handleNetwork() {
  //   Network.addListener('networkStatusChange', (status) => {
  //     console.log('Network status changed', status);
  //     this.isConnected = status.connected;

  //     // Afficher un toast en fonction de l'état de la connexion
  //     this.presentToast(this.isConnected);
  //   });
  //   const status = await Network.getStatus();
  //   console.log('Network status:', status);
  //   this.isConnected = status.connected;

  //   // Afficher un toast en fonction de l'état de la connexion
  //   this.presentToast(this.isConnected);
  
  // }

  // async getNetworkStatus() {
  //   const status = await Network.getStatus();
  //   console.log('Network status:', status);
  // }

  // async presentToast(isConnected: boolean) {
  //   const toast = await this.toastController.create({
  //     message: isConnected ? 'Connected to the internet' : 'No internet connection',
  //     duration: 2000,
  //     position: 'bottom',
  //     color: isConnected ? 'success' : 'danger',
  //   });

  //   toast.present();
  // }

  ngOnInit() {
    //this.loadCategories();
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.nbre_joueurs = navigation.extras.state['joueurs'];
    } else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.router.navigate(['/quiz']);
    }

    console.log(this.nbre_joueurs)
    this.bd.getIng4("categorie").then((reponse)=>{
      this.categories=reponse
      console.log(this.categories)
      console.log(reponse)
    })
    this.bd.getIng4('categories').then((rep) => {
      this.categories = rep.data;
      console.log(this.categories);
      console.log(rep);
    });
    
  }
  niveaux(item:any){
    const data={
      nbre_joueurs:this.nbre_joueurs,
      cat:item.id
    }
    this.router.navigate(['/niveaux'], { state: { datas: data} })
  }
  async loadCategories() {
    try {
      const categories = await (await this.bd.getCategories()).toPromise();

      if (Array.isArray(categories)) {
        this.categories = categories;
      } else {
        console.error('Unexpected API response format for categories');
      }0
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }

  onPage(item: any) {
    this.router.navigate(['choice-level'], { state: { categories: item.id } });
  }
}
