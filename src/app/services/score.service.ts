// score.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private scores: number[] = [];

  constructor() {}

  // Ajoutez un score à la liste des scores
  addScore(score: number) {
    this.scores.push(score);
  }

  // Récupère tous les scores enregistrés
  getScores(): number[] {
    return this.scores;
  }

  // Calcule et renvoie les scores classés
  getRankedScores(): { player: string; totalScore: number }[] {
    // Implémentez la logique de classement ici
    // Exemple simple : triez les scores du plus grand au plus petit
    const sortedScores = this.scores.slice().sort((a, b) => b - a);

    // Retournez les scores classés sous la forme d'un tableau d'objets
    return sortedScores.map((score, index) => ({ player: `Joueur ${index + 1}`, totalScore: score }));
  }
}
