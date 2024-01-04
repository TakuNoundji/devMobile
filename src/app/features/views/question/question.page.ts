import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Network} from '@capacitor/network'
import { Device } from '@capacitor/device';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage  {

  question: any = {
    Libelle_question: '',
    categories_id: 1, // Remplacez par l'ID de la catégorie appropriée
    niveaux_id: 1, // Remplacez par l'ID du niveau approprié
    reponses: [
      { choix: '', est_correct: true, points: 3 },
      { choix: '', est_correct: false, points: 0 },
      { choix: '', est_correct: false, points: 0 },
    ],
  };

  constructor(private questionService: QuestionService) {}

  proposerQuestion() {
    this.questionService.saveQuestion(this.question)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log('Question proposée avec succès', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la proposition de la question', error);
        }
      );
  }
}
