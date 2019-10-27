import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  headers: HttpHeaders;
  readonly authUrl = "http://ictapi/resource.php";
  readonly queryUrl = "http://ictapi/getsession?";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }
 
  getApiData(postData) {
    return this.http.post(this.authUrl, postData);
  }

  getSessionEvents(url) {
    return this.http.get(this.queryUrl + url, { headers: this.headers });
  }
}
