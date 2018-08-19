import { Component, OnInit, Input } from '@angular/core';
import { Button } from './button.model';
import { ButtonDataService } from '../button-data.service';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
@Input() private button: Button; 
private sound:string; 
@Input() private publicPage: boolean = false; 

constructor(private _buttonDataService: ButtonDataService) {
    let soundfile = new File([''], '../../assets/music/sound.mp3'); 
    //this.button = new Button('awesome music', 4, '');
    let blobURL = window.URL.createObjectURL(soundfile);
   

  }

  ngOnInit() {
  }

  buttonClick(){
     if(this.button.isPlaying()){
      this.button.pauseSound(); 
    }else{
      this.button.playSound(); 
    }
  }

  stopSound(){
    this.button.stopSound(); 
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    this.button.soundFile = myReader.result; 
   
    }
    myReader.readAsDataURL(file);
  }



  

}

