/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react'
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
  const [selectedCategory, setSelectedCategory] = useState('') // 默認顯示的分類名稱
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [sortOrder, setSortOrder] = useState('date_desc') // 默認為發布日期:由新到舊

  const getArticles = async (categoryId) => {
    console.log(categoryId);
    const apiUrl = `http://localhost:3005/api/my-articles/filter?category_id=${categoryId || 1}`
    console.log(apiUrl);
    const res = await fetch(apiUrl)
    const data = await res.json()
    const sortedArticles = sortArticles(data.data.articles, sortOrder) // 新增
    setArticles(sortedArticles)
    // setArticles(data.data.articles)
  }
  // console.log(articles);

  const getCategories = async () => {
    const apiUrl = 'http://localhost:3005/api/my-articles/category'
    const res = await fetch(apiUrl)
    const data = await res.json()
    setCategories(data.data.articles_category)
  }
  const handleCategoryClick = async (event, category) => {
    event.preventDefault()
    const { name, id } = category
    // 如果點擊的是當前選中的分類，直接返回
    if (id === selectedCategoryId) return;
    setArticles([]) // 在發送請求前清空文章列表⭐️⭐️⭐️⭐️但要小心放太上面，點擊相同分類會無article資料
    setSelectedCategory(name)
    // console.log(name);
    setSelectedCategoryId(id)
    // console.log(id);

    // 使用 router.push 更新 URL
    await router.push({
      pathname: router.pathname,
      query: { category_id: id },
    })
    // 在 URL 更新後獲取文章
    await getArticles(id)
  }
  // categoryName 是从 selectedCategory 变量中传递给 getImagePathPrefix 函数的
  // 具体来说，selectedCategory 是在 useEffect 和 handleCategoryClick 函数中设置的：
  // 	1.	初次加载页面时：
  // •	useEffect 中会检查当前的 category_id 和分类列表 categories。
  // •	如果 category_id 存在且匹配某个分类，selectedCategory 会被设置为该分类的名称。
  // •	如果 category_id 不存在，默认会将 categories 列表中的第一个分类设置为 selectedCategory。
  // 2.	用户点击某个分类时：
  // •	handleCategoryClick 函数会根据用户点击的分类，将 selectedCategory 更新为所点击分类的名称。

  // ⭐️categoryName 是通过调用 getImagePathPrefix(selectedCategory) 函数时，将 selectedCategory 作为参数传递给该函数的

  const getImagePathPrefix = (categoryName) => {
    switch (categoryName) {
      case '茶知識':
        return '/images/article/articlelist/teaknow/'
      case '茶創新':
        return '/images/article/articlelist/teanew/'
      case '茶故事':
        return '/images/article/articlelist/teastory/'
      case '茶生活應用':
        return '/images/article/articlelist/tealife/'
      default:
        return '/images/article/articlelist/articledefault.jpg'
    }
  }
  const sortArticles = (articles, sortOrder) => {
    switch (sortOrder) {
      case 'date_desc': // 發布日期:由新到舊
        return articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      case 'date_asc': // 發布日期:由舊到新
        return articles.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      case 'views_desc': // 觀看次數:由高到低
        return articles.sort((a, b) => b.views - a.views)
      case 'views_asc': // 觀看次數:由低到高
        return articles.sort((a, b) => a.views - b.views)
      default:
        return articles
    }
  }
  const handleSortChange = (event) => {
    event.preventDefault()
    const value = event.target.dataset.value
    setSortOrder(value)
  }
  useEffect(() => {
    if (!category_id) {
      router.push({
        pathname: router.pathname,
        query: { category_id: 1 },
      });
    }
  }, [category_id, router]);

  useEffect(() => {
    getCategories()
  }, [])

  // 為了初次加載頁面時，能正確對應分類
  // useEffect(() => {
  //   // 這段程式碼的意思是：如果 categories 陣列的長度為 0，就直接返回，不執行接下來的代碼，這通常用來處理尚未獲取或加載 categories 資料的情況。
  //   if (categories.length === 0) return
  //   // 根據 category_id 來設定當前選中的分類並獲取對應分類下的文章
  //   const fetchCategoryAndArticles = async () => {
  //     if (selectedCategoryId !== parseInt(category_id)) {
  //       // 	如果 URL 中存在 category_id（即用戶點擊了某個分類鏈接或在 URL 中直接輸入了某個分類的 ID），代碼會進入這個分支
  //       if (category_id) {
  //         // 在 categories 陣列中查找與 category_id 相匹配的分類物件（cat.id 等於 category_id）。
  //         const category = categories.find(cat => cat.id === parseInt(category_id))
  //         // 如果找到了對應的分類：
  //         if (category) {
  //           // 將該分類的名稱設置為當前選中的分類名稱
  //           setSelectedCategory(category.name)
  //           setSelectedCategoryId(category.id)
  //           // 通過分類 ID 獲取該分類下的文章。
  //           await getArticles(category.id)
  //           console.log(category.id);
  //         }
  //       } else {
  //         // Set default category if no category_id
  //         // 如果 URL 中沒有 category_id
  //         // 將 categories 陣列中的第一個分類設置為默認分類
  //         const defaultCategory = categories[0]
  //         setSelectedCategory(defaultCategory.name)
  //         setSelectedCategoryId(defaultCategory.id)
  //         await getArticles(defaultCategory.id)
  //       }
  //     }
  //   }
  //   // useEffect(() => { ... }, [category_id, categories]):
  //   // •	useEffect 是 React 中的一個 Hook，用來在 React 組件的渲染後執行副作用，例如數據獲取、DOM 操作或訂閱。
  //   // •	fetchCategoryAndArticles() 是在這個 useEffect 中要執行的副作用函數。
  //   // •	useEffect 的第二個參數是依賴陣列 [category_id, categories]，這表示只有當 category_id 或 categories 的值發生變化時，useEffect 內的代碼才會執行。
  //   fetchCategoryAndArticles()
  // }, [category_id, categories])

  const prevCategoryId = useRef();
  useEffect(() => {
    if (categories.length === 0 || prevCategoryId.current === category_id) return;
    const fetchCategoryAndArticles = async () => {
      const category = categories.find(cat => cat.id === parseInt(category_id)) || categories[0]
      setSelectedCategory(category.name)
      setSelectedCategoryId(category.id)
      await getArticles(category.id)
    }

    fetchCategoryAndArticles()
  }, [category_id, categories])

  useEffect(() => {
    const sortedArticles = sortArticles(articles, sortOrder);
    setArticles(sortedArticles);
  }, [sortOrder, articles]);



  return (
    <>
      <main className="article-list">
        <div className="container">
          <div className={`${styles['typetitle_group']}`}>
            {categories.map((category) => (
              <a
                key={category.id}
                className={`${styles['btn']}`}
                href="#"
                onClick={(event) => handleCategoryClick(event, category)} // 設定點擊事件
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
                    <FaAngleDown className={`${option['icon']}`} />
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
          <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-3  my-4 g-5 mx-0 ${styles['articlelist']}`}>
            {articles.map((article) => (
              <div className="col" key={article.id}>
                <Link href={`/article/detail/${article.id}`} className={`${styles['articleLink']}`}>
                  <div className={`${styles['articlecard']}`}>
                    <img
                      className={`${styles['articlecard-img']}`}
                      // ⭐️selectedCategory對應到上面的categoryName
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
                          className={`${styles['arrow-animation']}`}
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
    </>
  )
}