import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  OnInit
} from '@angular/core';
import { filter, find } from 'lodash';
import { ResizeSensor } from 'css-element-queries';

@Directive({
  selector: '[multiselect]'
})
export class CustomMultiselectDirective implements OnInit, OnDestroy {
  @Output() hiddenCount: EventEmitter<number>;

  public observer: MutationObserver;
  private resizeSensor: ResizeSensor;

  constructor(
    private elementRef: ElementRef
  ) {
    this.hiddenCount = new EventEmitter();
  }

  public ngOnInit(): void {
    this.observer = new MutationObserver((mutationsList) => {
      if (find(mutationsList, { type: 'childList' })) {
        this.checkItemsOverride();
      }
    });

    this.observer.observe(this.elementRef.nativeElement, { childList: true });
    this.resizeSensor = new ResizeSensor(this.elementRef.nativeElement, this.checkItemsOverride.bind(this));
  }

  public ngOnDestroy(): void {
    this.resizeSensor.detach();
    this.observer.disconnect();
  }

  public checkItemsOverride(): void {
    const hostOffsetTop = this.elementRef.nativeElement.offsetTop;
    const tagItems = this.elementRef.nativeElement.querySelectorAll('.dropdown-tag');
    const hiddenElements = filter(tagItems, (tagItem) => tagItem.offsetTop > hostOffsetTop);

    this.hiddenCount.emit(hiddenElements.length);
  }
}
