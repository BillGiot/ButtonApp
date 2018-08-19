import { Component, OnInit } from '@angular/core';
import {ButtonDataService} from './button-data.service'; 
import {Button} from './button/button.model'; 
import { Observable } from 'rxjs/Rx';

@Component({
  providers : [ButtonDataService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  private _buttons;  
  
constructor(private _buttonDataService: ButtonDataService){}

  ngOnInit() {
   // this._buttonDataService.buttons.subscribe(
   //   items => this._buttons = items);
    //console.log(  "button 1:" + this._buttons.get(0)); 
  
  }
  
  get buttons(): Observable<Button[]> {
    return this._buttons;
  }
}
