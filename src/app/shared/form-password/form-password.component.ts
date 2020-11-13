import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'form-password',
  templateUrl: 'form-password.html',
  styleUrls: ['form-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class FormPasswordComponent {
  @Input() controlState: FormControlState<string>;
  @Input() isVisible: boolean;
  @Input() autocomplete: string;
  @Input() placeholder: string;
  @Input() validationMessages: Map<string, string>;
  @Input() dataTestID: string;
  @Input() fieldRole: string;
  @Input() label: string;

  constructor() {
    this.placeholder = '';
  }
}
