import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class WebNotificationService {

    private permission = false;
    private pageIsHidden = false;

    constructor(zone: NgZone) {
        Notification.requestPermission( (status) => {
            if(status === "granted")
                this.permission = true;
        });
        document.addEventListener("visibilitychange", () => {
            if(document.visibilityState === "hidden")
                this.pageIsHidden = true;
            else
                this.pageIsHidden = false;
        });
    }

    newWebNotification(title : string, message : string) {
        if(this.permission) {        
            if (this.pageIsHidden) {
                new Notification(title, { body: message });
            }
        }
    }

} 