import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Feed } from '../model/feed.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: any;
  private $allFeed: Subject<Feed> = new Subject<Feed>();
  constructor() { }
  public startConnection() {
    return new Promise((resolve, reject) => {
      debugger;
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:49488/linenotify").build();
        
      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }
  public get AllFeedObservable(): Observable<Feed> {
    return this.$allFeed.asObservable();
  }
  public listenToAllFeeds() {
    (<HubConnection>this.hubConnection).on("EnvisionPulse", (data: Feed) => {
      console.log(data);
      this.$allFeed.next(data);
    });
  }

}
