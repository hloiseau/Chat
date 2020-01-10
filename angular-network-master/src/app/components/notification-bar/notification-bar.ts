import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'models';
import { NotificationService, WebNotificationService } from 'services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    @Input() notifications: Notification[] = [];

    constructor( private notificationSocketService: NotificationService, private notificationWebSocketService: WebNotificationService, private notification: NzNotificationService) {
        this.notificationSocketService.onNewNotifications( (value) => {
            let type = value.type;
            let message = value.message;
            this.notification.blank(type, message);
            this.notifications.push({ type: type, message: message });
            notificationWebSocketService.newWebNotification(`${type} Notification :`, message);
        });
    }

    ngOnInit() {
        let localNotifications = JSON.parse(localStorage.getItem("Notification"));
        this.notifications = localNotifications || [];
    }
}
