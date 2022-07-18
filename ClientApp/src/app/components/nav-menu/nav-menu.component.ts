import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { find, map } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  role: Observable<string[]>;
  userName: string;
  isAuthenticated: Observable<boolean>;

  constructor(private userService: UserService,private authorizeService: AuthorizeService)
  {
    this.authorizeService.getUser().subscribe(x=> {
      if(x == null)
          this.userName =null
      else
       this.userName=x.name
       this.role = this.userService.getRole();
      }
  )
  
  }
  ngOnInit()
  {
   

    
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
}
