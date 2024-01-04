import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPageModule {}
