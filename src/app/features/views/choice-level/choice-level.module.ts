import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChoiceLevelPageRoutingModule } from './choice-level-routing.module';

import { ChoiceLevelPage } from './choice-level.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ChoiceLevelPageRoutingModule
  ],
  declarations: [ChoiceLevelPage]
})
export class ChoiceLevelPageModule {}
