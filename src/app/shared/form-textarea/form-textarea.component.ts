import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'form-textarea',
  templateUrl: 'form-textarea.html',
  styleUrls: ['form-textarea.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class FormTextAreaComponent {
  @Input() controlState: FormControlState<string>;
  @Input() placeholder: string;
  @Input() validationMessages: Map<string, string>;
  @Input() dataTestID: string;
  @Input() fieldRole: string;
  @Input() label: string;
  @Input() rows: number;

  constructor() {
    this.placeholder = '';
  }
}
