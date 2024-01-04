import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RubriquesPageRoutingModule } from './rubriques-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RubriquesPage } from './rubriques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    RubriquesPageRoutingModule
  ],
  declarations: [RubriquesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class RubriquesPageModule {}
