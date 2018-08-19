import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Button } from '../button/button.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ButtonDataService } from '../button-data.service';


@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
  @Output() private newButton = new EventEmitter();
  private button: FormGroup;
  private _sound: string;
  private buttonObject: Button; 
  private errors: Boolean = false; 
  private exceedsLimit: Boolean; 
  

  constructor(private fb: FormBuilder, private router: Router, private _buttonDataService: ButtonDataService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(item => {
      this.buttonObject = item['button']});
    if (this.buttonObject === undefined) {
      this.button = this.fb.group({
        name: this.fb.control(''),
        sound: [null, Validators.required],
        publicButton: ["private"]
      });
    } else {
      this.button = this.fb.group({
        name: this.fb.control(this.buttonObject.name),
        sound: [this.buttonObject.soundFile, Validators.required], 
        publicButton: [this.buttonObject.publicButton ? "public" : "private"]
      });
    }

  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    let file: File = inputValue.files[0];
    if(file !== undefined){
    this.exceedsLimit = file.size > 1000000; 
    }
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {

      this._sound = myReader.result;

    }
    myReader.readAsDataURL(file);
  }

  onSubmit() {
   
    if(this.button.value.name !== "" && this.button.value.color !== "" && (this._sound !== undefined || this.buttonObject !== undefined) && !this.exceedsLimit){
    if(this.buttonObject === undefined){
    let button = new Button(this.button.value.name, this.button.value.color, this.button.value.publicButton === "private" ? false : true, 0, this._sound);      
    this._buttonDataService.addNewButton(button)
      .subscribe(item => {
        if (item !== undefined) {
          this.router.navigate(['/buttonlist']);
        }

      });
    }else {
      let button2 = new Button(this.button.value.name, this.button.value.color, this.button.value.publicButton === "private" ? false : true, 0, this._sound === undefined ? this.buttonObject.soundFile : this._sound, this.buttonObject.id);      
      this._buttonDataService.editButton(button2)
      .subscribe(item => {
        if (item !== undefined) {
          this.router.navigate(['/buttonlist']);
        }

      });
    }} else {
      this.errors = true; 
    } 
  }

  cancel() {
    this.router.navigate(['/buttonlist']);
  }
}
