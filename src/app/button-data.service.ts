import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../app/user/authentication.service';
import { Button } from './button/button.model';

@Injectable()
export class ButtonDataService {
  private readonly _appUrl = '/API/buttons/';


  constructor(private http: Http, private auth: AuthenticationService) { }

  get publicButtons(): Observable<Button[]> {
    return this.http.get(this._appUrl).map(response =>
      response.json().map(item =>
        new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile)
      )
    );
  }

  get buttons(): Observable<Button[]> {
    let userid = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.get(`${this._appUrl}${userid}/buttons`,
      { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) }).map(response =>
        response.json().map(item =>
          new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile, item._id)
        )
      );
  }

  addNewButton(rec): Observable<Button> {
    let userid = JSON.parse(localStorage.getItem('currentUser')).id;
    return this.http.post(`${this._appUrl}/${userid}`, rec)
      .map(res => res.json()).map(item =>
        new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile)
      );
  }

  getButtonById(id): Observable<Button> {
    let userid = JSON.parse(localStorage.getItem('currentUser')).id;    
    return this.http.get(`${this._appUrl}${userid}/${id}`,
    { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json()).map(item =>
        new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile, id)
      );
  }

  editButton(button): Observable<Button> {
    let userid = JSON.parse(localStorage.getItem('currentUser')).id;    
    return this.http.put(`${this._appUrl}${userid}/${button.id}`, button,
    { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) }).map(response => response.json()).map(item =>
      new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile, item.id)
    );
  }

  removeItem(button): Observable<Button> {
    let userid = JSON.parse(localStorage.getItem('currentUser')).id;        
    return this.http.delete(`${this._appUrl}${userid}/${button.id}`,
    { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(res => res.json()).map(item => new Button(item.name, item.color, item.publicButton, item.likes, item.soundFile, item.id)
  );
}

}
