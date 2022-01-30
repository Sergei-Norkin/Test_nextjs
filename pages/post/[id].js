import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../Index.module.scss'
import styles_post from './Post.module.scss'

export async function getServerSideProps(context) {
    const response = await  fetch (`https://jsonplaceholder.typicode.com/posts/${context.query.id}`)
    const post = await response.json()
    return { props:{post}  }
}


export default function User(props) {
    const router = useRouter()
    return <>
        <Head>
            <title>Запись {router.query.id} | {props.post.title}</title>
        </Head>
        <div className={styles.main}>
        <h1 className={styles.title} >
            <span className={styles.firstLetter}>З</span>
            <span className={styles.secondLetter}>а</span>
            <span className={styles.thirdLetter}>п</span>
            <span className={styles.forthLetter}>и</span>
            <span className={styles.fifthLetter}>с</span>
            <span className={styles.sixLetter}>ь</span>
            <span className={styles.sevensLetter}>-</span>
            <span className={styles.eightsLetter}>{router.query.id}</span>
          </h1>
            <div className={styles.postTitle}>
                {props.post.title}
            </div>
            <div className={styles.postBody}>
                {props.post.body}
            </div>
            <div className={styles_post.postButton}>
                <Link href={`/`} >
                    <a>
                        Вернуться обратно
                    </a>
                </Link>
            </div>
        </div>
    </>
}