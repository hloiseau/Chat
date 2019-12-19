import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'models';
import { NotificationService } from 'services';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    @Input() notifications: Notification[] = [];

    constructor( private postSocketService: NotificationService ) {
        this.postSocketService.onNewNotifications( (value) => {
            this.notifications.push({ type: value.type, message: value.message });
        });
    }

    ngOnInit() {

    }
}
