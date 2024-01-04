// ranking.page.ts
import { Component } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage {
  rankedScores: { player: string; totalScore: number }[] = [];
  username: string | null = null;

  constructor(private scoreService: ScoreService, private authService: AuthenticationService) {}

  ionViewWillEnter() {
    // Récupérez les scores classés depuis le service des scores
    this.rankedScores = this.scoreService.getRankedScores();

    // Récupérez le nom d'utilisateur depuis le service d'authentification
    this.authService.getLoggedInUser().subscribe((username) => {
      // Utilisez le nom d'utilisateur comme nécessaire
      this.username = username;
    });
  }
}
