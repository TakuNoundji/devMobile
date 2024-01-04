// profile.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private authService: AuthenticationService, private storage: Storage) {}

  async createProfile(username: string) {
    const userId = await this.authService.getLoggedInUser().toPromise();
    if (userId) {
      const profileData = { username, scores: [] };
      await this.storage.set(`profile_${userId}`, profileData);
    }
  }

  async getProfile() {
    const userId = await this.authService.getLoggedInUser().toPromise();
    if (userId) {
      return this.storage.get(`profile_${userId}`);
    }
    return null;
  }

  async updateScores(newScore: number) {
    const userId = await this.authService.getLoggedInUser().toPromise();
    if (userId) {
      const profile = await this.getProfile();
      if (profile) {
        profile.scores.push(newScore);
        await this.storage.set(`profile_${userId}`, profile);
      }
    }
  }
}
