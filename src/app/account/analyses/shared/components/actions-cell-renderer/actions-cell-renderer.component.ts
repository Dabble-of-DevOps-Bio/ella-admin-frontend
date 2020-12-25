import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseCellRendererComponent } from '@shared/base-cell-renderer';

@Component({
  selector: 'analyses-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesActionsCellRendererComponent extends BaseCellRendererComponent {
}
