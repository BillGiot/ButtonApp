import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../button/button.model'; 
import {ButtonDataService} from '../button-data.service'; 
@Component({
  selector: 'app-buttonpage',
  templateUrl: './buttonpage.component.html',
  styleUrls: ['./buttonpage.component.css']
})
export class ButtonpageComponent implements OnInit {
  private _buttons; 
  
  constructor(private _buttonDataService: ButtonDataService) {  }

  ngOnInit() {
    this._buttonDataService.publicButtons.subscribe(
      items => {
        this._buttons = items;      
      });
  }

  stopAllButtons(){
    this._buttons.forEach(button => button.stopSound());
    }

  ngOnDestroy() {
    this.stopAllButtons(); 
  }

}
