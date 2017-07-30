import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class TelegramService {

  private apiUrl = 'https://us-central1-hobbit-61211.cloudfunctions.net/';

  constructor(private http: Http) { }

  sendMessage(text: string) {
    const method = 'TelegramSendMessage';
    const bodyString = JSON.stringify({text:text});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + method, bodyString, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
