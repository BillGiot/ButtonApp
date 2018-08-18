import {Button} from '../button/button.model'; 

export class User{
private _username:string; 
private _buttons: Button[]; 




get buttons():Button[]{
    return this._buttons; 
}
get username():string{
    return this._username; 
}

}