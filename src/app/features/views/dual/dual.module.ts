import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DualPageRoutingModule } from './dual-routing.module';

import { DualPage } from './dual.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    IonicModule,
    DualPageRoutingModule
  ],
  declarations: [DualPage]
})
export class DualPageModule {}
