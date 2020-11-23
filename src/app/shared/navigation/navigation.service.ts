import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(
    private location: Location,
    private router: Router
  ) { }

  public back(defaultPreviousURL?: string): void {
    if (history.length > 1) {
      this.location.back();
    } else if (defaultPreviousURL) {
      this.router.navigateByUrl(defaultPreviousURL);
    }
  }
}
