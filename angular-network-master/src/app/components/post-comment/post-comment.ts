import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { MessageParser} from "services"

/**
 * Affiche le commentaire d'un post
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
    ngOnInit() {
      // détermine le bon type de contenu

      this.comment = new MessageParser().parse(this.comment);

  }
}
