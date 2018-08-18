import { ButtonDataService } from '../button-data.service';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Button } from './button.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ButtonResolver implements Resolve<Button> {
  constructor(private buttonDataService: ButtonDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Button> {
      return this.buttonDataService.getButtonById(route.params['id']);
  }
}