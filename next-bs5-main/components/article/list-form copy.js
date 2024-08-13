/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import styles from '@/components/article/list.module.scss'
import option from '@/components/article/option.module.sass'
import StarLarge from '@/components/star/star-large'
import { IoEyeSharp } from 'react-icons/io5'
import { FaRegComment, FaBookmark } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'

export default function ListForm() {
  const router = useRouter()
  const { category_id } = router.query
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('') 
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [sortOrder, setSortOrder] = useState('date_desc')

  // 使用 useCallback 優化函數
  const getArticles = useCallback(async (categoryId) => {
    try {
      const apiUrl = `http://localhost:3005/api/my-articles/filter?category_id=${categoryId || 1}`
      const res = await fetch(apiUrl)
      const data = await res.json()
      setArticles(data.data.articles)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }, [])

  const getCategories = useCallback(async () => {
    try {
      const apiUrl = 'http://localhost:3005/api/my-articles/category'
      const res = await fetch(apiUrl)
      const data = await res.json()
      setCategories(data.data.articles_category)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }, [])

  const handleCategoryClick = useCallback(async (event, category) => {
    event.preventDefault()
    const { name, id } = category
    if (id === selectedCategoryId) return;
    setArticles([])
    setSelectedCategory(name)
    setSelectedCategoryId(id)

    localStorage.setItem('lastVisitedCategoryId', id.toString());
    await router.push({
      pathname: router.pathname,
      query: { category_id: id },
    }, undefined, { shallow: true })
    await getArticles(id)
  }, [selectedCategoryId, router, getArticles])

  const getImagePathPrefix = useCallback((categoryName) => {
    const pathMap = {
      '茶知識': '/images/article/articlelist/teaknow/',
      '茶創新': '/images/article/articlelist/teanew/',
      '茶故事': '/images/article/articlelist/teastory/',
      '茶生活應用': '/images/article/articlelist/tealife/'
    }
    return pathMap[categoryName] || '/images/article/articlelist/articledefault.jpg'
  }, [])

  const handleSortChange = useCallback((event) => {
    event.preventDefault()
    const value = event.target.dataset.value
    if (sortOrder !== value) {
      setSortOrder(value)
    }
  }, [sortOrder])

  // 使用 useMemo 優化排序
  const sortedArticles = useMemo(() => {
    const articlesCopy = [...articles]
    switch (sortOrder) {
      case 'date_desc':
        return articlesCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      case 'date_asc':
        return articlesCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      case 'views_desc':
        return articlesCopy.sort((a, b) => b.views - a.views)
      case 'views_asc':
        return articlesCopy.sort((a, b) => a.views - b.views)
      default:
        return articlesCopy
    }
  }, [articles, sortOrder])

  useEffect(() => {
    const initializeCategory = () => {
      const initialCategoryId = category_id || localStorage.getItem('lastVisitedCategoryId') || '1'
      setSelectedCategoryId(parseInt(initialCategoryId))
      
      if (!category_id) {
        router.push({
          pathname: router.pathname,
          query: { category_id: initialCategoryId },
        }, undefined, { shallow: true })
      }
    }

    initializeCategory()
    getCategories()
  }, [category_id, router, getCategories])

  useEffect(() => {
    if (categories.length > 0 && selectedCategoryId) {
      const category = categories.find(cat => cat.id === selectedCategoryId) || categories[0]
      setSelectedCategory(category.name)
      getArticles(category.id)
    }
  }, [selectedCategoryId, categories, getArticles])

  return (
    <main className="article-list">
      <div className="container">
        <div className={styles['typetitle_group']}>
          {categories.map((category) => (
            <a
              key={category.id}
              className={styles['btn']}
              href="#"
              onClick={(event) => handleCategoryClick(event, category)}
            >
              {category.name}
            </a>
          ))}
        </div>
        <StarLarge />
        <div className="d-flex justify-content-between align-items-center mt-5 px-4">
          <h4>{selectedCategory}</h4>
          <div className="d-flex justify-content-end">
            <div className={`d-flex align-items-center justify-content-between ${option['articlechoose']}`}>
              <input type="checkbox" name="a1-1" id="a1-1" />
              <label htmlFor="a1-1" className="d-flex flex-column">
                <p className="mb-0 align-items-center">
                  文章排序
                  <FaAngleDown className={option['icon']} />
                </p>
                <ul className="ul1">
                  <li><a href="#" data-value="date_desc" onClick={handleSortChange}>發布日期:由新到舊</a></li>
                  <li><a href="#" data-value="date_asc" onClick={handleSortChange}>發布日期:由舊到新 </a></li>
                  <li><a href="#" data-value="views_desc" onClick={handleSortChange}>觀看次數:由高到低</a></li>
                  <li><a href="#" data-value="views_asc" onClick={handleSortChange}>觀看次數:由低到高 </a></li>
                </ul>
              </label>
            </div>
          </div>
        </div>
        <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 my-4 g-5 mx-0 ${styles['articlelist']}`}>
          {sortedArticles.map((article) => (
            <div className="col" key={article.id}>
              <Link href={`/article/detail/${article.id}`} className={styles['articleLink']}>
                <div className={styles['articlecard']}>
                  <img
                    className={styles['articlecard-img']}
                    src={`${getImagePathPrefix(selectedCategory)}${article.article_images.replace(/"/g, '')}`}
                    alt=""
                    onError={(e) => { e.target.src = '/images/article/articlelist/articledefault.jpg'; }}
                  />
                  <div className={`${styles['articlec-body']} m-3`}>
                    <div className={`${styles['timeandnum']} m-3`}>
                      <p className="p2 mb-0 me-3">{article.created_at.split(' ')[0]}</p>
                      <IoEyeSharp color="#ffffffa0" />
                      <p className="p2 mb-0 me-3 ms-2">{article.views}</p>
                      <FaRegComment color="#ffffffa0" />
                      <p className="p2 mb-0 me-3 ms-2">10</p>
                      <FaBookmark color="#ffffffa0" />
                      <p className="p2 mb-0 me-3 ms-2">10</p>
                    </div>
                    <h5 className={`${styles['arttitle']} m-3`}>{article.title}</h5>
                    <p className={`${styles['arttext']} m-3`}>{article.content}</p>
                    <div className="d-flex">
                      <p className={`${styles['arttext']} m-3 p2`}>閱讀更多</p>
                      <img
                        src="/images/article/articlelist/rightarrow.svg"
                        alt="Right Arrow"
                        className={styles['arrow-animation']}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}