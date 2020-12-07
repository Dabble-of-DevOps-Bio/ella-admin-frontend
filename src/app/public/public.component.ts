import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicFacade } from './public.facade';

@Component({
  selector: 'app-public-root',
  templateUrl: 'public.html',
  styleUrls: ['public.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {
  public isResetPasswordPage$: Observable<boolean>;

  constructor(
    private facade: PublicFacade
  ) {
    this.isResetPasswordPage$ = this.facade.isResetPasswordPage$;
  }
}
