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
            console.log(document.visibilityState);
            if(document.visibilityState === "hidden")
                this.pageIsHidden = true;
            else
                this.pageIsHidden = false;
        });
    }

    newWebNotification(title : string, message : string) {
        console.log("test1")
        if(this.permission) {        
            console.log("test2")
            if (this.pageIsHidden) {
                console.log("test3");

                let notification = new Notification(title, { body: message });
                notification.addEventListener("click", (event) => {
                    console.log(event);
                })
            }
        }
    }

} 