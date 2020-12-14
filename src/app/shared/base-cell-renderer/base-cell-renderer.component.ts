import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export class BaseCellRendererComponent implements ICellRendererAngularComp {
  protected params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public refresh(params?: ICellRendererParams): boolean {
    return true;
  }
}
