import express from 'express'
import cors from 'cors'
const router = express.Router()

// 使用 CORS 中間件
router.use(cors())

// 解析 JSON 請求體
router.use(express.json())

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM articles')
  const articles = rows

  // 標準回傳JSON
  return res.json({ status: 'success', data: { articles } })
})

router.get('/category', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM articles_category')
  const articles_category = rows

  return res.json({ status: 'success', data: { articles_category } })
})

router.get('/filter', async function (req, res) {
  const category_id = Number(req.query.category_id) // 使用 req.query 來讀取查詢參數
  let query = 'SELECT * FROM articles'
  let params = []

  if (category_id) {
    query += ' WHERE category_id = ?'
    params.push(category_id)
  }

  const [rows] = await db.query(query, params)
  const articles = rows

  return res.json({ status: 'success', data: { articles } })
})
router.get('/top-views', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM `articles` ORDER BY `views` DESC LIMIT 5;'
  )
  const top_views = rows
  return res.json({ status: 'success', data: { top_views } })
})
router.get('/new-articles', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM `articles` ORDER BY `articles`.`created_at` DESC LIMIT 5'
  )
  const new_articles = rows
  return res.json({ status: 'success', data: { new_articles } })
})

// 為什麼ｐｏｓｔ不行？
router.get('/:id/views', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid ID' })
  }
  try {
    const [result] = await db.query(
      'UPDATE articles SET views = views + 1 WHERE id = ?',
      [id]
    )
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Article not found' })
    }
    const [rows] = await db.query('SELECT views FROM articles')
    const views = rows

    res.json({
      status: 'success',
      data: { views },
    })
  } catch (error) {
    // 捕捉任何錯誤並返回錯誤信息
    console.error('Error updating article views:', error)
    res.status(500).json({ status: 'error', message: 'Error updating views' })
  }
})
// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  // 轉為數字
  const id = Number(req.params.id)

  const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [id])
  const article = rows[0]

  return res.json({ status: 'success', data: { article } })
})

export default router
