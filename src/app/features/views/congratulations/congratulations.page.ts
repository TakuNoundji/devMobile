import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ScoreService } from 'src/app/services/score.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {
  score: number = 0;
  username: string | null = null;
  
  constructor(private route: ActivatedRoute,private authService: AuthenticationService,private scoreService: ScoreService,private router: Router, private socialSharing: SocialSharing) { 
    
  }

  ngOnInit() {
    this.score = this.route.snapshot.params['score'];
    this.scoreService.addScore(this.score);
    this.authService.getLoggedInUser().subscribe((username) => {
      // Utilisez le nom d'utilisateur comme nécessaire
      this.username = username;
      
      console.log('Nom d\'utilisateur:', username);
    });
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        // Traitez l'invitation ici (par exemple, redirigez vers la page du jeu)
        console.log('Invitation acceptée pour l\'utilisateur avec ID:', userId);

        // Redirigez vers la page du jeu
        this.router.navigate(['onboarding']);
      }
    });
  }

  shareScore() {
    const message = `J'ai obtenu un score de ${this.score} au quiz ! 🚀 Téléchargez l'application pour défier vos connaissances : "https://play.google.com/store/apps/details?id=votre.package.name"`;
  
    this.socialSharing.share(message, 'Score au quiz',undefined, undefined)
      .then(() => console.log('Score partagé avec succès'))
      .catch((error) => console.error('Erreur lors du partage du score', error));
  }
  shareInvitation() {
    const invitationMessage = 'Rejoins-moi sur Mboa Store !';
    const invitationLink = 'https://mboastore.com/invitation?userId=123';

    // Partager le lien d'invitation via le plugin SocialSharing
    this.socialSharing.share(invitationMessage, 'Invitation à jouer', undefined, invitationLink)
      .then(() => console.log('Lien d\'invitation partagé avec succès'))
      .catch((error) => console.error('Erreur lors du partage du lien d\'invitation', error));
  }
  generateInvitationLink() {
    // Générer un lien d'invitation unique avec des paramètres
    const invitationLink = 'https://mboastore.com/invitation?userId=123';
  
    // Partager le lien d'invitation via le plugin SocialSharing
    this.socialSharing.share('Rejoins-moi sur Mboa Store !', 'Invitation à jouer', undefined, invitationLink)
      .then(() => console.log('Lien d\'invitation partagé avec succès'))
      .catch((error) => console.error('Erreur lors du partage du lien d\'invitation', error));
  }

}
