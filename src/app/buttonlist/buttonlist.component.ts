import { Component, OnInit, Input } from '@angular/core';
import { ButtonDataService } from '../button-data.service';
import { Button } from '../button/button.model';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-buttonlist',
  templateUrl: './buttonlist.component.html',
  styleUrls: ['./buttonlist.component.css']
})
export class ButtonlistComponent implements OnInit {
  @Input() private publicButtonList: Boolean;

  private _buttons;
  private _buttonListPublic: Button[];
  private _buttonListPrivate: Button[];
  
  constructor(private _buttonDataService: ButtonDataService, private authService: AuthenticationService, private router: Router) { 
  }

  ngOnInit() {
    this._buttonDataService.buttons.subscribe(
      items => {
        this._buttons = items; 
        this._buttonListPublic = items.filter(item => item.publicButton === true);
        this._buttonListPrivate = items.filter(item => item.publicButton === false);
        
      });
  }

  get buttons(): Observable<Button[]> {
    return this._buttons;
  }

  get buttonListPrivate(): Button[] {
    return this._buttonListPrivate;
  }

  get buttonListPublic(): Button[] {
    return this._buttonListPublic;
  }

  buttonAdded(name, color, soundFile) {
    this._buttonDataService.addNewButton(new Button(name, color, false, 0, soundFile))
      .subscribe(item => {
        this._buttons.push(item);
        this._buttonListPrivate.push(item);
      });
    }
  
    removeButton(button: Button) {
      this._buttonListPublic = this._buttonListPublic.filter(val => val.id !== button.id);
      this._buttonListPrivate = this._buttonListPrivate.filter(val => val.id !== button.id);
      this._buttonDataService.removeItem(button).subscribe( item => {
        this._buttons = this._buttons.filter(val => val.id !== item.id);
       // this._buttonListPublic = this._buttonListPublic.filter(val => val.id !== item.id);
       // this._buttonListPrivate = this._buttonListPrivate.filter(val => val.id !== item.id);
      });
    
    }
 
makeButtonPublicPrivate(button: Button){
  button.publicButton = !button.publicButton; 
  this._buttonDataService.editButton(button)
  .subscribe(item => {
    if(button.publicButton){
      this._buttonListPublic.push(button); 
      this._buttonListPrivate = this._buttonListPrivate.filter(item => item.id !== button.id); 
    }else{
      this._buttonListPrivate.push(button); 
      this._buttonListPublic = this._buttonListPublic.filter(item => item.id !== button.id); 

    }

  });
}
    
stopAllButtons(){
this._buttonListPrivate.forEach(button => button.stopSound());
this._buttonListPublic.forEach(button => button.stopSound()); 
}


ngOnDestroy() {
  this.stopAllButtons(); 
}

}
