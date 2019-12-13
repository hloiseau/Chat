import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService } from 'services';

/**
 * Ajoute un nouveau channel
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;
    isVisible: boolean = false;
    
    // OutPut for interaction with menu Channel
    // @Output() channelAdded : EventEmitter<any> = new EventEmitter<any>();

    model = { name: '' };
    constructor(
        private channelService: ChannelService
    ) {
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
        this.model.name = '';
    }

    async save() {
        if (this.ngForm.valid) {
            let channel = await this.channelService.add(this.model.name);
            // emit the new channel (OutPut)
            // this.channelAdded.emit(channel);
            this.hide();
        }
    }
}