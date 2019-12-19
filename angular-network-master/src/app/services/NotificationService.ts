import { Injectable, NgZone } from '@angular/core';
import { Notification } from '../models';
import { PostSocketService } from './PostSocketService';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class NotificationService {
    private postSocket : PostSocketService;

    constructor(postSocket: PostSocketService, zone: NgZone) {
        this.postSocket = postSocket;
    }

    onNewNotifications(callback: (notification:  Notification) => void) {
        this.postSocket.onPost( value => {
            callback({ type: 'Post', message: `'${value.user.username}' a posté '${value.message}' sur le channel '${value.channel.name}'` });
        });
        this.postSocket.onComment( value => {
            callback({ type: 'Comment', message: `'${value.user.username}' a commenté le post de '${value.post.user.username}' sur le channel '${value.channel.name}'` });
        });
        this.postSocket.onLike( value => {
            callback({ type: 'Like', message: `'${value.user.username }' a liké le post de '${value.post.user.username}' sur le channel '${value.post.channel.name}'` });
        });
        this.postSocket.onNewChannel( value => {
            callback({ type: 'Channel', message: `'${value.name}' a été ajouté` });
        });
    }
}