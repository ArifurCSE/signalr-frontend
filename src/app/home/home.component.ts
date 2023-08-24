import { Component } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { Feed } from '../model/feed.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  feed: Feed[] = [];
  allFeedSubscription: any;

  constructor(private signalrService: SignalrService) { }

  ngOnInit(): void {
      // 1 - start a connection
    this.signalrService.startConnection().then(() => {
      console.log("connected");
      // alert("connected");
      // 2 - register for ALL relay
      this.signalrService.listenToAllFeeds();

      // 3 - subscribe to messages received
      this.allFeedSubscription = this.signalrService.AllFeedObservable
            .subscribe((res: Feed) => {
              this.feed.push(res);
            });
    });
  }

  ngOnDestroy(): void {
    (<Subscription>this.allFeedSubscription).unsubscribe();
  }
}
