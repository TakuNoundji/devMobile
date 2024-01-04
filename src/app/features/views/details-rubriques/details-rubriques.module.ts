import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsRubriquesPageRoutingModule } from './details-rubriques-routing.module';

import { DetailsRubriquesPage } from './details-rubriques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DetailsRubriquesPageRoutingModule
  ],
  declarations: [DetailsRubriquesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsRubriquesPageModule {}
