import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CustomSelectFacade } from './custom-select.facade';
import { CustomSelectOption } from './models';
import { FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';

@Component({
  selector: 'custom-select',
  templateUrl: 'custom-select.html',
  styleUrls: ['custom-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class CustomSelectComponent<T extends string | number> {
  @Input() controlState: FormControlState<T>;
  @Input() options: Array<CustomSelectOption<T>> = [];
  @Input() placeholder: string = '';
  @Input() hasScroll: boolean;
  @Input() isLoading: boolean;
  @Input() label: string;
  @Input() isRequired: boolean;

  @Output() onLoadNextPage: EventEmitter<void>;

  public get selectedOption(): CustomSelectOption<T> {
    return this.options.find((option) => option.id === this.controlState.value);
  }

  public get selectedValueTitle(): string {
    return this.selectedOption?.title || this.placeholder;
  }

  public get isDisabled(): boolean {
    return (this.controlState) ? this.controlState.isDisabled : false;
  }

  public get isNotFound(): boolean {
    return !(this.isLoading || this.options?.length);
  }

  constructor(
    private facade: CustomSelectFacade
  ) {
    this.onLoadNextPage = new EventEmitter();
  }

  public onClickOption(option: CustomSelectOption<T>): void {
    this.facade.changeOption(this.controlState.id, option.id);

    if (this.controlState.isPristine) {
      this.facade.markAsDirty(this.controlState.id);
    }
  }

  public onScroll(): void {
    this.onLoadNextPage.emit();
  }
}
