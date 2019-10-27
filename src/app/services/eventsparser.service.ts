import { Injectable } from '@angular/core';

declare const getPosition: any;
declare const convertToObject: any;
declare const specialChars: any;
declare const displayDateTime: any;
declare const decryptAES: any;

@Injectable({
  providedIn: 'root'
})

export class EventsparserService {
  hasEvent: boolean = true;

  constructor() { }

  getEvents(encRes, type, events) {
    let res = decryptAES(encRes);

    if (res === "<no response>" && type == "latest")
      this.hasEvent = false;

    if (res.substr(0, 5) == "Event") {
      let eventobj = convertToObject(res);
      let e, c, k, g;

      for (e in eventobj)
        if (e.substr(0, 5) == "Event") {
          if (e.substr(0, 9) != "EventCode") {
            c = getPosition(eventobj[e], " ", 3) + 1;
            k = eventobj[e].substr(0, c);
            g = eventobj[e].substr(c);
            g = specialChars(g, "replace").replace("OFFLINE USER 00000", "WX Operator");
            //            console.log("Description:" + g + "Time:" + displayDateTime(k, "WX"));
            events.unshift({ description: g, time: displayDateTime(k, "WX") });
          }
        }
    }
    return this.hasEvent;
  }
}
