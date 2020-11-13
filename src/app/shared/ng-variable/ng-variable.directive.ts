import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NgVariableContext } from './models';

@Directive({
  selector: '[ngVar]'
})
export class NgVariableDirective<T = unknown> {
  @Input()
  public set ngVar(value: T) {
    this.context.$implicit = value;
    this.context.ngVar = value;
  }

  public static ngTemplateGuard_ngVar: 'binding';
  public static ngVarUseIfTypeGuard: void;

  private context: NgVariableContext<T>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<NgVariableContext<T>>
  ) {
    this.context = new NgVariableContext<T>();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }
}
