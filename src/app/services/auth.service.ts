import { Injectable, OnDestroy} from '@angular/core';
import { WebapiService } from './webapi/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {  
  dataToPost: { Username: string; Password: string; IPAddress: string; ControllerIPAddress: string; };

  constructor(public apiService: WebapiService) {
    this.dataToPost =
      {
        Username: "apitest",
        Password: "pT}'Ejwc-FY7<<B~",
        IPAddress: "49.50.253.44:50501",
        ControllerIPAddress: "49.50.253.44:50501"
      }
  }
  ngOnDestroy() { console.log('AuthService instance destroyed.'); }

  loginAuth() {
    return this.apiService.getApiData(this.dataToPost);
  }

}
