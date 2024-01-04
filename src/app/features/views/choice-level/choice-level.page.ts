import { Router } from '@angular/router';
import { BdService } from 'src/app/services/bd.service';

import { Component, OnInit } from '@angular/core';
 // Assurez-vous de mettre le bon chemin

@Component({
  selector: 'app-choice-level',
  templateUrl: './choice-level.page.html',
  styleUrls: ['./choice-level.page.scss'],
})
export class ChoiceLevelPage implements OnInit {
  niveaux: any[] = [];
  cat: any;
  data : any;
  navigation : any;
  constructor( private router: Router, private bd : BdService) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.data = navigation.extras.state['datas'];
     }
     else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.router.navigate(['/categories']);
    }

    console.log(this.data)

    this.bd.getIng4("niveaux").then((reponse:any)=>{
      this.niveaux=reponse
    })
    this.bd.getIng4("niveaux").then((rep: any)=>{
      this.niveaux=rep
      console.log(this.niveaux)
      console.log(rep)
    })

    const navigations = this.router.getCurrentNavigation();

    if (navigations?.extras && navigations.extras.state){
     this.cat = navigations.extras.state['categories']
    }

  }

    
    // Appelez la fonction getNiveaux du service
  //   try {
  //     this.niveaux = await this.rubriquesService.getNiveaux();
  //     console.log('Niveaux récupérés:', this.niveaux);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des niveaux dans choice-level:', error);
  //   }
  // }

  // Fonction appelée lorsque l'utilisateur clique sur un niveau
  questionCatNiv(item:any){

    const datas={
       niv:item.id,
       cat:this.data?.cat,
       nbre_joueur:parseInt(this.data.nbre_joueurs)
     }
 
     if( datas.nbre_joueur==1){
       this.router.navigate(['/quiz'], { state: {data:datas}} )
     }
 
     if(datas.nbre_joueur>1){
       this.router.navigate(['/quiz-p'], { state: {data:datas}} )
     }
 
   }

  onPage(item : any) {

    const datas={
      niv: item.id,
      cat: this.cat
    }
    if (this.router) {
      this.router.navigate(["details-rubriques"], { state: { data: datas } });
    }
  }

  // allerAuxDetailsRubriques(categorie: any, idNiveau: string) {
  //   this.router.navigate(['/details-rubriques', categorie.id, idNiveau]);
  // }
  }

  

  // onPage(item: any){
  //   this.router.navigate(["details-rubriques"], {state: { categories : item.id}});


  // }


