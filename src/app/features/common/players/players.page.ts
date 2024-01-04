// players.page.ts
import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-players',
  templateUrl: 'players.page.html',
})
export class PlayersPage {
  profiles: any[] = [];

  constructor(private profileService: ProfileService) {}

  ionViewWillEnter() {
    this.loadProfiles();
  }

  async loadProfiles() {
    this.profiles = await this.profileService.getProfile();
  }
}
