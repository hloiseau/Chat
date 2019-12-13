import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);
        if (pictureMatche) {
            return new PicturePostContent(post.message)
        }

        const videoRegex = /http[s]?:\/\/.+\.(mp4)/gmi;  // TODO
        // retourner une instance de VideoPostContent si match
        if(videoRegex.exec(post.message)){
          return new VideoPostContent(post.message)
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        if(youtubeRegex.exec(post.message)){
          const tb = post.message.split('=');
          const id = tb[tb.length - 1];
          return new YoutubePostContent(id)
        }
        // retourner une instance de YoutubePostContent si match

        return null;
    }
}
