import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PostService, MessageParser } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';

/**
 * Wrap user inputs like textarea
 */
@Component({
    selector: 'user-inputs',
    templateUrl: 'user-inputs.html'
})
export class UserInputsComponent {

    @Input() channelId: string;
    message:string;

    @Output()
    submitted: EventEmitter<any> = new EventEmitter();

    constructor(
        private postService: PostService
    ) {
    }

    send() {
        if(!this.message) return;
        this.submitted.emit(this.message);

    }
}
