// network.service.ts
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private network: Network) {
    this.initializeNetworkEvents();
  }

  private initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      this.isConnected.next(false);
    });

    this.network.onConnect().subscribe(() => {
      this.isConnected.next(true);
    });
  }

  getNetworkStatus() {
    return this.isConnected.asObservable();
  }
}
