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

    parse(post: Post): Post{
      const contentList = []
      const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
      const pictureMatche = pictureRegex.exec(post.message);
      if(pictureMatche){
        post.message = post.message.replace(pictureRegex, "")
        for(let i = 0; i < pictureMatche.length; i++){
          if(pictureMatche[i].length > 3 )
          contentList.push(new PicturePostContent(pictureMatche[i]))
        }
      }

        const videoRegex = /http[s]?:\/\/.+\.(mp4)/gmi;
        const videoMatche = videoRegex.exec(post.message)
        if(videoMatche){
          post.message = post.message.replace(videoRegex, "")
          for(let i = 0; i < videoMatche.length; i++){
            if(videoMatche[i].length > 3 )
            contentList.push(new VideoPostContent(videoMatche[i]))
          }
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const youtubeMatche = youtubeRegex.exec(post.message)
        if(youtubeMatche){
          post.message = post.message.replace(youtubeRegex, "")
          for (let i = 0; i < youtubeMatche.length; i++) {
            if(youtubeMatche[i].length > youtube.length ){
              const tb = youtubeMatche[i].split('=');
              const id = tb[tb.length - 1];
              contentList.push(new YoutubePostContent(id))
            }

          }
        }

        const linkRegex = /^(http[s]?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gmi;
        const linkMatche = linkRegex.exec(post.message)
        if(linkMatche){
          for (let i = 0; i < linkMatche.length; i++) {
            post.message = post.message.replace(linkMatche[i], "<a>"+linkMatche[i]+"</a>")
          }
        }
        post.content = contentList

        return post;
    }
}
