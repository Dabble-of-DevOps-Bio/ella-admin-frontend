import { Injectable } from '@angular/core';
import { NotificationTypeClassEnum } from './enums';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(
    private toastr: ToastrService
  ) { }

  public success(message: string, typeClass: NotificationTypeClassEnum = NotificationTypeClassEnum.COMMON): void {
    this.toastr.success(message, null, { toastClass: typeClass });
  }

  public warning(message: string, typeClass: NotificationTypeClassEnum = NotificationTypeClassEnum.COMMON): void {
    this.toastr.warning(message, null, { toastClass: typeClass });
  }

  public error(message: string, typeClass: NotificationTypeClassEnum = NotificationTypeClassEnum.COMMON): void {
    this.toastr.error(message, null, { toastClass: typeClass });
  }

  public info(message: string, typeClass: NotificationTypeClassEnum = NotificationTypeClassEnum.COMMON): void {
    this.toastr.info(message, null, { toastClass: typeClass });
  }
}
