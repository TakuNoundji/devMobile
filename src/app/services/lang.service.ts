
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private defaultLanguage = 'en';
  private currentLanguage: string;

  constructor(private platform: Platform) {
    this.currentLanguage = this.getPhoneLanguage();
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(language: string): void {
    // Vous pouvez ajouter une logique supplémentaire ici, par exemple, pour sauvegarder la langue dans le stockage local.
    this.currentLanguage = language;
  }

  private getPhoneLanguage(): string {
    const phoneLanguage = navigator.language || this.defaultLanguage;
    return this.extractLanguageCode(phoneLanguage);
  }

  private extractLanguageCode(language: string): string {
    if (language.length >= 2) {
      return language.substring(0, 2).toLowerCase();
    }
    return this.defaultLanguage;
  }
}

