import { format, formatDistanceToNow } from "date-fns";
import { ptBR }  from "date-fns/locale";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react";

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content{
    type: 'paragraph' | 'link';
    content: string;

}
export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}
interface PostProps{
   post: PostType;
}

export function Post({ post }: PostProps) {

    const [comments, setComments] = useState([
        'Post muito legal'
    ])

    const [newCommentText, setNewCommentText] = useState('')


    const publisheDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR,})

    const publisheDateRelativeToNow = formatDistanceToNow(post.publishedAt, {locale: ptBR, addSuffix: true});

    function handleCreateNewComment(event:FormEvent) {

        event.preventDefault();

        setComments([...comments, newCommentText])
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string) {
        const commentsWhitoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWhitoutDeletedOne);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    const isNewCommentDisabled = newCommentText.length === 0;
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl}  />

                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publisheDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publisheDateRelativeToNow}
                </time>

            </header>

            <div className={styles.content}>
                {
                    post.content.map(line => {
                        if (line.type == 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        }else if (line.type == 'link'){
                            <p key={line.content}><a href="#">{line.content}</a></p>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    value={newCommentText}
                    onChange={handleNewCommentChange} 
                    placeholder="Deixe um comentário"
                    onInvalid={handleNewCommentInvalid}
                    required 
                />

                <footer>
                   <button 
                    type="submit" 
                    disabled={isNewCommentDisabled}>
                            Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return (
                            <Comment 
                                key={comment} 
                                content={comment}
                                onDeleteComment={deleteComment}
                            />    
                        )
                    })
                }
            </div>
        </article>
    )
}