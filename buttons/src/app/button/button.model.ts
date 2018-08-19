
export class Button {
    private _id: Number;
    private _name: string;
    private _color: string; 
    private _publicButton: Boolean; 
    private _likes: number;
    private _soundFile: string;
    private _sound: any;

    constructor(name: string, color:string, publicButton: Boolean, likes: number, soundFile: string, id?:Number, ) {
        if(id !== undefined){
            this._id = id; 
        }
        this._name = name;
        this._color = color; 
        this._publicButton = publicButton; 
        this._likes = likes;
        this._soundFile = soundFile;
        if(this._soundFile !== null && this._soundFile.startsWith("data")){
            this._sound = new Audio(this._soundFile);            
        }else{
            this._sound = new Audio("");
        }
        
    }

    get soundFile(): string {
        return this._soundFile;
    }

    set soundFile(soundFile: string) {
        this._soundFile = soundFile;
        this._sound = new Audio(this._soundFile);
    }

    get name():string{
        return this._name; 
    }

    get publicButton() : Boolean {
        return this._publicButton; 
    }

    get color (): string {
        return this._color; 
    }

    set publicButton(publicButton: Boolean){
       this._publicButton = publicButton; 
    }

    playSound() {
        this._sound.play();
    }

    pauseSound() {
        this._sound.pause();
    }

    stopSound(){
       this.pauseSound(); 
    }
    
    isPlaying(): Boolean {

        return !this._sound.paused; 
    }

    get id():Number{
            return this._id; 
    }
    
    set id(id:Number){
        this._id = id; 
    }
    
    toJSON(){
        return {
            _id: this._id, 
            name: this._name,  
            color: this._color, 
            publicButton: this._publicButton, 
            likes: this._likes, 
            soundFile: this._soundFile
        }
    }

}