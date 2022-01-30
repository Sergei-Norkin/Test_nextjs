import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import ReactPaginate from 'react-paginate'
import styles from './Index.module.scss'

function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
              <div key={item.id} className={styles.postBlock}>
                <div className={styles.postId}>
                  пост-{item.id}
                </div>
                <div className={styles.postTitle}>
                  <Link href={`/post/[id]`} as={`/post/${item.id}`}>
                        <a>
                          {item.title}
                        </a>
                    </Link>
                </div>
                <div className={styles.postBody}>
                  {item.body}
                </div>
            </div>
          ))}
      </>
    );
  }

function PaginatedItems( { itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
  
    useEffect(async () => {
      const response = await  fetch ('https://jsonplaceholder.typicode.com/posts')
      const items = await response.json()
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(items.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(items.length / itemsPerPage))
    }, [itemOffset, itemsPerPage])
  
    const handlePageClick = async (event) => {
      const response = await  fetch ('https://jsonplaceholder.typicode.com/posts')
      const items = await response.json()
      const newOffset = (event.selected * itemsPerPage) % items.length
      setItemOffset(newOffset)
    }
    return (
        <>
          <Items currentItems={currentItems} />
          <ReactPaginate styles={styles}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Предыдущая"
            nextLabel="Следующая"
            renderOnZeroPageCount={null}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pageLink}
            containerClassName={styles.pagination}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextClassName={styles.pageItem}
            nextLinkClassName={styles.pageLink}
            activeClassName={styles.active}
          />
        </>
      )
    }


export default function Posts() {
    return ( 
    <>
        <Head>
            <title>Записи</title>
        </Head>
        <div className={styles.main}>
          <h1 className={styles.title} >
            <span className={styles.firstLetter}>З</span>
            <span className={styles.secondLetter}>а</span>
            <span className={styles.thirdLetter}>п</span>
            <span className={styles.forthLetter}>и</span>
            <span className={styles.fifthLetter}>с</span>
            <span className={styles.sixLetter}>и</span>
          </h1>
          <PaginatedItems itemsPerPage={4} />
        </div>
    </>
    )
}