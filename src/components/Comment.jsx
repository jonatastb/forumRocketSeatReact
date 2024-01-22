import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

export function Comment() {
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/png.png"/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego Fernandes</strong>
                            <time title="20 de Janeiro às 20:51" dateTime="2024-01-20 20:51:00">
                               Cerca de 2h
                            </time>
                        </div>
                        <button title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>Muito bom</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>2</span>
                    </button>
                </footer>
            </div>


        </div>
    )
}