import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthenticationService ) {}

  get currentUser(): Observable<String> {
    return this.authService.user$;
}

  ngOnInit() {
  }

}
