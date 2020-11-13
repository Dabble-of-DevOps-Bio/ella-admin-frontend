import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'form-text',
  templateUrl: 'form-text.html',
  styleUrls: ['form-text.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class FormTextComponent {
  @Input() controlState: FormControlState<string>;
  @Input() type: string;
  @Input() autocomplete: string;
  @Input() placeholder: string;
  @Input() validationMessages: Map<string, string>;
  @Input() dataTestID: string;
  @Input() fieldRole: string;
  @Input() label: string;
  @Input() isRequired: boolean;
  @Input() maxLength: number;

  constructor() {
    this.placeholder = '';
  }
}
