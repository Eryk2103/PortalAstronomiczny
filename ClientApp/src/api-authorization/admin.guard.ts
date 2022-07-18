import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/userService.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  role: string;

  constructor(private userService: UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }
  isAdmin(){
    let user = sessionStorage.getItem('role');
    if(user == "Administrator")
      return true;
    else
      return false;
  }
}
