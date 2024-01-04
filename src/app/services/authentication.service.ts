
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedInUser: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private storage: Storage) {
    this.loadUser();
  }

  private async loadUser() {
    const user = await this.storage.get('user');
    this.loggedInUser.next(user);
  }

  getLoggedInUser(): Observable<string | null> {
    return this.loggedInUser.asObservable();
  }

  async login(username: string) {
    await this.storage.set('user', username);
    this.loggedInUser.next(username);
  }

  async logout() {
    await this.storage.remove('user');
    this.loggedInUser.next(null);
  }
}


