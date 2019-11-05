import { Injectable } from '@angular/core';

declare const [
    getPosition,
    convertToObject,
    specialChars,
    displayDateTime,
    decryptAES
];

export class EventStr {
  constructor(public description: string, public time: string) { }
}

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
//            events.unshift({ description: g, time: displayDateTime(k, "WX") });
            events.unshift(new EventStr(g, displayDateTime(k, "WX")));
          }
        }
    }
    return this.hasEvent;
  }
}
