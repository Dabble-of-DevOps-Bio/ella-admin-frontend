import { Component } from '@angular/core';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { NavbarFacade } from './navbar.facade';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent {
  public profile$: Observable<User>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private facade: NavbarFacade
  ) {
    this.profile$ = this.facade.profile$;
    this.isAuthenticated$ = this.facade.isAuthenticated$;
  }
}
