import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BdService } from 'src/app/services/bd.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-details-rubriques',
  templateUrl: './details-rubriques.page.html',
  styleUrls: ['./details-rubriques.page.scss'],
})
export class DetailsRubriquesPage implements OnInit {
  questions: any[] = [];
  reponses: any[] = [];
  currentIndex: number = 0; // Ajout de la variable currentIndex
  cat: any;
  score: number = 0;
  formattedTime: string = '';
  timeRemaining: number = 120; // 2 minutes en secondes
  progression=0
  questionNiVCat:any[]=[]
  tempsRestant: number=120;
  private tempsParQuestion = 120; // en secondes
  private minuterie: any;
  compteur=0
  constructor(private storage: Storage,private changeDetectorRef: ChangeDetectorRef, private alertController: AlertController, private bd: BdService, private router : Router) {}

  ngOnInit() {
    this.loadQuestionsAndReponses();
        
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state){ 
     this.cat = navigation.extras.state['data']
     console.log(this.cat)
    }
  }

 // ...

 async presentQuitOptions() {
  const alert = await this.alertController.create({
    header: 'Options',
    message: 'Que souhaitez-vous faire ?',
    buttons: [
      {
        text: 'Quitter le quiz',
        handler: () => {
          this.leaveQuiz();
        }
      },
      {
        text: 'Quitter la rubrique',
        handler: () => {
          this.leaveCategory();
        }
      },
      {
        text: 'Annuler',
        role: 'cancel'
      }
    ]
  });

  await alert.present();
}

async loadQuestionsAndReponses() {
  try {
    const storedQuestions = await this.storage.get('questions');
    const storedReponses = await this.storage.get('reponses');


    if ( storedQuestions && storedQuestions.length > 0) {
      // const questionId = this.questions[this.currentIndex].id;
      // const reponsesData = await this.bd.getListReponsesByQuestionId(questionId);
      for( let i=0; i < storedQuestions.length; i++){
          if(this.cat.niv===storedQuestions[i].niveaux_id && this.cat.cat===storedQuestions[i].categories_id){
            this.questions.push(storedQuestions[i])
          }
      }
      //this.questions = storedQuestions;
      console.log(this.questions)
      //this.reponses = storedReponses;
      //
        
        this.loadReponses();
        this.reponses=[]
      //   }
      // }

      this.lancerMinuterie(); // Démarrez le compte à rebours 
      
    } else {
      console.warn('Aucune question trouvée dans le stockage local.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des questions et réponses', error);
  }
}

leaveQuiz() {
  this.router.navigate(['/onboarding']); // Remplacez '/accueil' par le chemin de la page d'accueil
}

leaveCategory() {
  this.router.navigate(['/rubriques']); // Remplacez '/selection-rubrique' par le chemin de la page de sélection de rubrique
}

// ...

startTimer() {
  setInterval(() => {
    if (this.timeRemaining > 0) {
      this.formattedTime = String(this.timeRemaining);
      console.log(this.formattedTime); // Affichez ou utilisez formattedTime comme nécessaire
      this.timeRemaining--;
    } else {
      this.handleTimeout(); // Appelé lorsque le temps est écoulé
    }
  }, 1000);
}

// Fonction pour formater le temps en minutes et secondes
formatTime(minutes: number, seconds: number): string {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

handleTimeout() {

  this.nextQuestion();
}

async selectAnswer(reponse: any) {

    if (reponse.est_correct.toLowerCase()==="vrai" || reponse.est_correct.toLowerCase()==='1' ){
      this.score=reponse.points+this.score
      //this.nextQuestion();
  
     }
        
     else {
      console.error('Réponse non trouvée pour la question actuelle.');
  
}
}





// Ajoutez la méthode handleButtonClick à votre fichier TypeScript
handleButtonClick(reponse: string) {
  this.selectAnswer(reponse);
  this.nextQuestion();
}




  // Méthode pour passer à la question suivante
  nextQuestion() {
    this.reinitialiserMinuterie();
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      // Charger les réponses pour la nouvelle question
      this.loadReponses();
      this.reponses=[]

      this.lancerMinuterie();
      this.miseAJourProgression();
  
    } else {
      
      this.router.navigate(['/congratulations', { score: this.score }]);
      console.log('Vous avez atteint la dernière question.');
    }
  }

  

  // Méthode pour charger les réponses de la question actuelle
  async loadReponses() {
    try {
      if (this.questions.length > 0 && this.currentIndex < this.questions.length) {
        const questionId = this.questions[this.currentIndex].id;
        //const reponsesData = await this.bd.getListReponsesByQuestionId(questionId);
        const reponsesData = await this.storage.get("reponses");
        for(let i=0; i<reponsesData.length -1; i++){
          if(reponsesData[i].questions_id=== questionId ){
            this.reponses.push(reponsesData[i])
          }
        }
        console.log(this.reponses)

        // if (reponsesData) {
        //   this.reponses = reponsesData;
        //   console.log(this.reponses)
        // } else {
        //   console.error('Réponses non disponibles pour la question actuelle.');
        // }
      } else {
        console.error('ID de question non valide ou currentIndex hors limites.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses', error);
    }
  }

  private reinitialiserMinuterie(): void {
    // Réinitialiser la minuterie
    clearInterval(this.minuterie);
  }
  private lancerMinuterie(): void {
    this.tempsRestant = this.tempsParQuestion;
  
    // Lancer la minuterie pour passer à la question suivante après le temps défini
    this.minuterie = setInterval(() => {
      this.tempsRestant--;
  
      // Vérifier si le temps est écoulé
      if (this.tempsRestant === 0) {
        const correct={
          est_correct:"Faux",
          points:0
        }
         this.nextQuestion(); // Appeler la méthode avec une réponse incorrecte
      }
    }, 1000);
  }

  miseAJourProgression() {
    this.progression = (this.compteur + 1) / this.questionNiVCat.length;
  }

}
