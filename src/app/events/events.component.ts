import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EventsqueryService } from '../services/eventsquery.service';
import { EventsparserService } from '../services/eventsparser.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  timer;
  servertype = 1;
  hasEvent: boolean = true;
  events = [];

  constructor(public authService: AuthService, public queryService: EventsqueryService, public parserService: EventsparserService,) {
  }

  ngOnInit() {
    this.getAuthData();    
  }

  getAuthData() {
    this.authService.loginAuth().subscribe(
      (res) => {
//        console.log(res);
        localStorage.setItem("WXKey", res["AESKEY"]);
        localStorage.setItem("SESSID", res["SESSID"]);
        localStorage.setItem("SEQ", res["seq"]);
        this.eventReportInit();
      },
      (err) => { console.warn(err) }
    ); 
  }

  requestEvents(eventType: string) {
    let url = "http://49.50.253.44:50501/PRT_CTRL_DIN_ISAPI.dll?",
      params = "Request&Type=Events&SubType=" + eventType;

    this.queryService.eventsQuery(url, params, eventType).subscribe(
      (res) => {
        this.hasEvent = this.parserService.getEvents(res, eventType, this.events);
      },
      (err) => { console.warn(err) }
    );
    eventType == "Previous" && clearInterval(this.timer);
  }

  eventReportInit() {
    this.timer ? clearTimeout(this.timer) : null;
    this.requestEvents("Latest");
    this.timer = setInterval(() => this.requestEvents("Update"), 2E3);
  }

  restartMonitoring() {
    this.requestEvents("Latest");
    this.timer = setInterval(() => this.requestEvents("Update"), 2E3);
  }

  onLogout() {
    localStorage.removeItem("WXKey");
    localStorage.removeItem("SESSID");
    localStorage.removeItem("SEQ");
    this.timer ? clearTimeout(this.timer) : null;
  }
}
