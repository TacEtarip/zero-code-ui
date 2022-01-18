import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loginService.getRoles()?.indexOf('admin') === -1) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate();
  }
}
