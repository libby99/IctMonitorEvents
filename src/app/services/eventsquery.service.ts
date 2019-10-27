import { Injectable } from '@angular/core';
import { WebapiService } from './webapi/webapi.service';
declare const encryptAES: any;

@Injectable({
  providedIn: 'root'
})
export class EventsqueryService {

  constructor(public apiService: WebapiService) { }

  getEventsData(encParams: string, type: string) {
    return this.apiService.getSessionEvents(encParams);
  }

  eventsQuery(url: string, params: string, type: string) {
    let sequence = localStorage.getItem("SEQ");
    let encryptedParams = encryptAES(params + "&Sequence=" + sequence);
    localStorage.setItem("SEQ", sequence + 1);
    return this.getEventsData(url + encryptedParams, type);
  }
}
