import { NotificationComponent } from './../shared/notification/notification.component';
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UIService {
  screenSubj = new BehaviorSubject<boolean>(window.innerWidth < 768)
  topDialog!: MatDialogRef<unknown, any>;
  topDialogTimer: any;
  constructor(
    private dialog: MatDialog
  ) { }

  readScreen() {
    this.screenSubj.next(window.innerWidth < 768)
  }

  notify(data: string, center: boolean = false) {
    console.log(center);

    if (center) {
      if (this.topDialog) {
        clearTimeout(this.topDialogTimer)
        this.topDialog.close()
      }
      this.topDialog = this.dialog.open(NotificationComponent, {
        width: '250px',
        panelClass: ['center'],
        data: {
          message: data,
          center
        },
        hasBackdrop: false
      })
    } else {
      if (this.topDialog) {
        clearTimeout(this.topDialogTimer)
        this.topDialog.close()
      }
      this.topDialog = this.dialog.open(NotificationComponent, {
        width: '250px',
        position: {
          top: '0px',
          right: '0px'
        },
        data: {
          message: data,
          center
        },
        hasBackdrop: false
      })

      this.topDialogTimer = setTimeout(() => {
        this.topDialog.close()
      }, 3000)
    }
  }

  close() {
    this.dialog.closeAll()
  }
}
