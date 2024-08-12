import { useState } from 'react'
import styles from './member.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import GoogleLogo from '@/components/icons/google-logo'
import Image from 'next/image'

// Datepicker relies on browser APIs like document
// dynamically load a component on the client side,
// use the ssr option to disable server-rendering.
const InputDatePicker = dynamic(() => import('../common/input-date-picker'), {
  ssr: false,
})

export default function RegisterForm() {
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState('')

  return (
    <>
      <main className={`${styles['login']}`}>
        <div className="container">
          <div className="d-flex justify-content-center">
            <img
              className={`${styles['main-title']}`}
              src="/images/main-title/signup.svg"
              alt="login"
            />
          </div>
          <div className={`star-large mb-4"`}>
            <Image src="/images/star.png" alt="" width={16} height={16} />
            <img
              src="/images/Vector 25.png"
              alt=""
              width="100%"
              height="1.5px"
              style={{ margin: '0 -2px' }}
            />
            <Image src="/images/star.png" alt="" width={16} height={16} />
          </div>
          <div className={`${styles['loginsignin']}`}>
            <div className={`${styles['signinsec1']} text-center mb-4 mt-4`}>
              <p className="mb-5">註冊新帳號</p>
              <a className={`${styles['gfast']} btn btn-no-radius`}>
                <GoogleLogo className="mx-3" />
                {/* <img
                className="googlelogo"
                src="/neimages/Google__G__logo.svg.webp"
                alt=""
              /> */}
                <p className="m-0 p-0">快速註冊</p>
              </a>
            </div>
            <img
              className={['img-fluid m-5', styles['orline']].join(' ')}
              src="/images/orline.png"
              alt=""
            />
            <div
              className={['d-flex flex-column', styles['signinsec2']].join(' ')}
            >
              <div className="text-center">
                <p>電子郵件註冊</p>
              </div>
              <form className="mb-3">
                <label className="mt-1" htmlFor="name">
                  姓名*
                </label>
                <input
                  className=""
                  type="text"
                  name="name"
                  id="name"
                  placeholder="請輸入你的姓名"
                />
                <label className="mt-1" htmlFor="email">
                  電子郵件*
                </label>
                <input
                  className=""
                  type="email"
                  name="email"
                  id="email"
                  placeholder="請輸入你的電子郵件"
                />
                <label className="mt-1" htmlFor="password">
                  密碼*
                </label>
                <input
                  className=""
                  type="password"
                  name="password"
                  id="password"
                  placeholder="請輸入你的密碼"
                />
                <label className="mt-1" htmlFor="repassword">
                  密碼確認*
                </label>
                <input
                  className="mt-3 mb-4"
                  type="password"
                  name="repassword"
                  id="repassword"
                  placeholder="再輸入一次密碼"
                />
                <div
                  className={[
                    styles['btn-div'],
                    'm-4 d-flex justify-content-center',
                  ].join(' ')}
                >
                  <button className={`${styles['btn-in']}`} type="submit">
                    加入會員
                  </button>
                </div>
              </form>
              <div
                className={`${styles['form-footer']} d-flex justify-content-center`}
              >
                <p className="me-2">已經有會員帳號?</p>
                <Link href="/member/login">會員登入</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <main className={`w-100 m-auto text-center form-member`}>
        <h2 className="text-center mb-3">加入會員</h2>
        <p className={`text-center mb-3 ${styles['text-note']}`}>
          建立 Next
          會員個人檔案，學習最新開發技術與得到啟發，立即加入這個大家族。
        </p>
        <form>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="email"
                className={`form-control w-100 ${styles['form-control']} `}
                placeholder="電子郵件地址"
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入有效的電子郵件地址。
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
                placeholder="密碼"
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入密碼。
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-6">
              <input
                type="firstname"
                className={`form-control  ${styles['form-control']} ${styles['invalid']} `}
                placeholder="姓氏"
              />
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入有效的姓氏。
              </div>
            </div>

            <div className="col-sm-6">
              <input
                type="firstname"
                className={`form-control  ${styles['form-control']} ${styles['invalid']} `}
                placeholder="名字"
              />
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入有效的名字。
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group position-relative d-inline-flex align-items-center">
                <InputDatePicker
                  showDatepicker={showDatepicker}
                  setFormat="yyyy-mm-dd"
                  showFormat="yyyy/mm/dd"
                  setDate={setDate}
                  className={`form-control w-100 ${styles['form-control']} `}
                  style={{
                    borderRadius: 2.8,
                  }}
                  placeholder="出生年月日"
                />
                <i
                  className="bi bi-calendar4 position-absolute"
                  role="presentation"
                  style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
                  onClick={() => setShowDatepicker(!showDatepicker)}
                ></i>
              </div>
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入出生年月日。
            </div>
            <p className={`text-center mb-1 ${styles['text-note2']}`}>
              每年生日將獲得專屬會員慶生禮。
            </p>
          </div>
          <div className="row mb-3">
            <div className={`col-sm-12" ${styles['label-left']}`}>
              <label htmlFor="country" className="form-label">
                國家/地區
              </label>
              <select id="country" className="form-select">
                <option>台灣</option>
                <option>日本</option>
                <option>韓國</option>
                <option>中國</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="btn-group">
              <input
                type="radio"
                className="btn-check"
                name="sex"
                id="option1"
                autoComplete="off"
              />
              <label className="btn btn-outline-primary" htmlFor="option1">
                男
              </label>
              <input
                type="radio"
                className="btn-check"
                name="sex"
                id="option2"
                autoComplete="off"
              />
              <label className="btn btn-outline-primary" htmlFor="option2">
                女
              </label>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                />
                <label
                  className={`form-check-label  ${styles['notice']}`}
                  htmlFor="gridCheck1"
                >
                  訂閱電子郵件就能收到產品、優惠以及會員福利的最新消息
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <p className={`${styles['notice']}`}>
              如建立帳號，即代表同意本站
              <Link href="/about">隱私權政策</Link>和
              <Link href="/about">使用條款</Link>。
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            加入
          </button>

          <div className="row mt-2">
            <p className={`${styles['notice']}`}>
              已經是會員了嗎？ <Link href="/member/login">登入</Link>。
            </p>
          </div>
        </form>
      </main> */}
    </>
  )
}
