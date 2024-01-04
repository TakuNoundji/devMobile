import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionPageRoutingModule } from './question-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionPage } from './question.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    QuestionPageRoutingModule
  ],
  declarations: [QuestionPage]
})
export class QuestionPageModule {}
