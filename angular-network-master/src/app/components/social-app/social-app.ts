import { Component, OnInit, EventEmitter } from '@angular/core';
import { Channel } from 'models';
import { ChannelService } from 'services';
import { ActivatedRoute } from '@angular/router';

/**
 * Display the channel list, the social feed and the notification bar for logged users.
 * Affiche la liste des channels sur la gauche, les posts au centre, et une barre de notifications sur la gauche
 */
@Component({
    selector: 'social-app',
    templateUrl: 'social-app.html'
})
export class SocialAppComponent implements OnInit {
    channels: Channel[] = [];

    constructor(
        private channelService: ChannelService,
        private route: ActivatedRoute
    ) {
    }

    async ngOnInit() {
        this.channelService.getAll().then( channel => {
            this.channels = channel;
        });
        // utiliser le channelService pour récupérer la liste
        // this.route.firstChild.params permet de connaître les paramètre de l'url
    }
}
