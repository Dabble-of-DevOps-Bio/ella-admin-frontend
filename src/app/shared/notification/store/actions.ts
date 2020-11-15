import { createAction, props } from '@ngrx/store';
import { NotificationTypeClassEnum } from '../enums';

export class NotificationActions {
  /* tslint:disable:typedef */
  public static showSuccess = createAction(
    '[Notification] Show Success',
    props<{ translationKey: string, translationParams?: object, typeClass?: NotificationTypeClassEnum }>()
  );

  public static showWarning = createAction(
    '[Notification] Show Warning',
    props<{ translationKey: string, translationParams?: object, typeClass?: NotificationTypeClassEnum }>()
  );

  public static showError = createAction(
    '[Notification] Show Error',
    props<{ translationKey: string, translationParams?: object, typeClass?: NotificationTypeClassEnum }>()
  );

  public static showInfo = createAction(
    '[Notification] Show Info',
    props<{ translationKey: string, translationParams?: object, typeClass?: NotificationTypeClassEnum }>()
  );
  /* tslint:enable:typedef */
}
