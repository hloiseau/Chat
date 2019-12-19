import { Component, Input } from '@angular/core';
import { Post, User } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Affiche les poste
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {
    username: string
    @Input() post: Post;


    constructor(
        private postSocket: PostSocketService,
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        // détermine le bon type de contenu
        this.postSocket.onComment((comment) => this.post.comments.push(comment));
        this.post.content = this.parser.parse(this.post);
        this.username = this.user.username;
    }



    onComment(message: string) {
      this.postService.comment(this.post, message)
        // TODO envoyer le message
    }
}
