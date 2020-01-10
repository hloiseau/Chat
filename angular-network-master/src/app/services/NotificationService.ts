import { Injectable, NgZone } from '@angular/core';
import { Notification } from '../models';
import { PostSocketService } from './PostSocketService';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class NotificationService {
    private postSocket : PostSocketService;
    private notifications : Notification[] = [];

    constructor(postSocket: PostSocketService, zone: NgZone) {
        this.postSocket = postSocket;
        let localNotification = localStorage.getItem("Notification");
        if (localNotification !== null)
            this.notifications = JSON.parse(localNotification);
    }

    onNewNotifications(callback: (notification:  Notification) => void) {
        this.postSocket.onPost( value => {
            let notification = { type: 'Post', message: `'${value.user.username}' a posté '${value.message}' sur le channel '${value.channel.name}'` };
            this.setInLocalStorage(notification);
            callback(notification);
        });
        this.postSocket.onComment( value => {
            let notification = { type: 'Comment', message: `'${value.user.username}' a commenté le post de '${value.post.user.username}' sur le channel '${value.post.channel.name}'` };
            this.setInLocalStorage(notification);
            callback(notification);
        });
        this.postSocket.onLike( value => {
            let notification = { type: 'Like', message: `'${value.user.username }' a liké le post de '${value.post.user.username}' sur le channel '${value.post.channel.name}'` };
            this.setInLocalStorage(notification);
            callback(notification);
        });
        this.postSocket.onNewChannel( value => {
            let notification = { type: 'Channel', message: `'${value.name}' a été ajouté` };
            this.setInLocalStorage(notification);
            callback(notification);
        });
    }

    setInLocalStorage(notification : Notification) {
        this.notifications.push(notification);
        localStorage.setItem("Notification", JSON.stringify(this.notifications));
    }
} 