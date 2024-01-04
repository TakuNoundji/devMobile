import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../services/lang.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  selectedLang: string = 'en';
  constructor( private langService: LangService) { }
  
  changeLang() {
    this.langService.setLanguage(this.selectedLang);
  }
  ngOnInit() {
  }

}
