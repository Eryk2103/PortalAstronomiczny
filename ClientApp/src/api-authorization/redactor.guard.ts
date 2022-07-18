import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/userService.service';

@Injectable({
  providedIn: 'root'
})
export class RedactorGuard implements CanActivate {

  role: string;

  constructor(private userService: UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isRedactor();
  }
  isRedactor(){
    let user = sessionStorage.getItem('role');
    if(user == "Redactor")
      return true;
    else
      return false;
  }
}
