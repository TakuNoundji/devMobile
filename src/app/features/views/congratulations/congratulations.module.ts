import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CongratulationsPageRoutingModule } from './congratulations-routing.module';

import { CongratulationsPage } from './congratulations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    CongratulationsPageRoutingModule
  ],
  declarations: [CongratulationsPage]
})
export class CongratulationsPageModule {}
