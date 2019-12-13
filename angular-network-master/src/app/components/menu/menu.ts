import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { PostSocketService } from 'services';

/**
 * Side menu permettant de naviguer entre les différents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];
    constructor(
        private postSocketService: PostSocketService
    ) {
        postSocketService.onNewChannel( (value) => {
            this.channels.push(value);
        });
    }

    // public channelAdded(channel) {
    //     this.channels.push(channel);
    // }
}