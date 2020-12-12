import { Boxed, FormControlState, NgrxDefaultViewAdapter, NGRX_FORM_VIEW_ADAPTER, unbox } from 'ngrx-forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { CustomMultiselectFacade } from './custom-multiselect.facade';
import { CustomMultiselectOption } from './models';
import { without, xor } from 'lodash';

@Component({
  selector: 'custom-multiselect',
  templateUrl: 'custom-multiselect.html',
  styleUrls: ['custom-multiselect.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => NgrxDefaultViewAdapter),
      multi: true
    }
  ]
})
export class CustomMultiselectComponent<T extends string | number> {
  @Input() controlState: FormControlState<Boxed<Array<T>>>;
  @Input() options: Array<CustomMultiselectOption<T>> = [];
  @Input() placeholder: string = '';
  @Input() hasScroll: boolean;
  @Input() isLoading: boolean;
  @Input() label: string;
  @Input() isRequired: boolean;

  @Output() onLoadNextPage: EventEmitter<void>;

  public get value(): Array<T> {
    return unbox(this.controlState.value) || [];
  }

  public get selectedOptions(): Array<CustomMultiselectOption<T>> {
    return this.options.filter((option) => this.value.includes(option.id));
  }

  public get hasSelectedOptions(): boolean {
    return !!this.selectedOptions.length;
  }

  public get isDisabled(): boolean {
    return (this.controlState) ? this.controlState.isDisabled : false;
  }

  public get isNotFound(): boolean {
    return !(this.isLoading || this.options?.length);
  }

  public hiddenTagsCount: number;

  constructor(
    private facade: CustomMultiselectFacade
  ) {
    this.onLoadNextPage = new EventEmitter();
  }

  public hiddenCount(count: number): void {
    this.hiddenTagsCount = count;
  }

  public getIsChecked(option: CustomMultiselectOption<T>): boolean {
    return this.value.includes(option.id);
  }

  public onClickOption(option: CustomMultiselectOption<T>): void {
    const options = xor(this.value, [option.id]);

    this.facade.updateOptions(this.controlState.id, options);

    if (this.controlState.isPristine) {
      this.facade.markAsDirty(this.controlState.id);
    }
  }

  public removeTag(option: CustomMultiselectOption<T>): void {
    const options = without(this.value, option.id);

    this.facade.updateOptions(this.controlState.id, options);
  }

  public resetOptions(): void {
    this.facade.updateOptions(this.controlState.id, []);
  }

  public onScroll(): void {
    this.onLoadNextPage.emit();
  }
}
