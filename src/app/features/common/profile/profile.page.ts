// profile.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  username: string = '';
  hoveredAvatar: string = '';
  selectedAvatar: string = '';
  avatarList: string[] = [
    '../../../../assets/avatar1.jpg',
    '../../../../assets/avatar2.jpg',
    '../../../../assets/avatar3.jpg',
    '../../../../assets/avatar4.jpg',
    '../../../../assets/avatar5.jpg',
    '../../../../assets/avatar6.png',
    '../../../../assets/avatar7.jpg',
    '../../../../assets/avatar8.jpg',

  ];
  scores: number[] = [];
  constructor(private authService: AuthenticationService, private storage: Storage, private profileService: ProfileService, private router: Router) {
    this.authService.getLoggedInUser().subscribe(async (user) => {
      if (user) {
        const profile = await this.profileService.getProfile();
        if (profile) {
          this.username = profile.username;
          this.scores = profile.scores;
        }
      }
    });
  }
  enlargeImage(avatar: string) {
    this.hoveredAvatar = avatar;
  }

  shrinkImage(avatar: string) {
    if (this.hoveredAvatar === avatar) {
      this.hoveredAvatar = '';
    }
  }

  
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  async createProfile(username: string) {
    const userId = await this.authService.getLoggedInUser().toPromise();
    if (userId) {
      const profileData = { username, scores: [] };
      await this.storage.set(`profile_${userId}`, profileData);
    }
  }
  changePlayer() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  async getProfile() {
    const userId = await this.authService.getLoggedInUser().toPromise();
    if (userId) {
      return this.storage.get(`profile_${userId}`);
    }
    return null;
  }

  async getAllProfiles() {
    const allProfiles: any[] = [];
    // Retrieve all profiles stored in Ionic Storage
    await this.storage.forEach(async (value, key) => {
      if (key.startsWith('profile_')) {
        allProfiles.push(value);
      }
    });
    return allProfiles;
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
