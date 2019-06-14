import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (localStorage.getItem('user_id')) {
      return true;
    }
    Common.Dlog(state.url);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
