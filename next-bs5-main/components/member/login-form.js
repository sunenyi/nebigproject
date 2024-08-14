/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import styles from './member.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Star from '@/components/star/star'
import GoogleLogo from '@/components/icons/google-logo'
import { RiEyeLine } from 'react-icons/ri'
import { RiEyeOffLine } from 'react-icons/ri'
import useAuth from '@/hooks/useAuth'

export default function LoginForm() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [user, setUser] = useState({
    email: '',
    password: '',
    // agree: false, // checkbox 同意會員註冊條款
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    // agree: '', // 錯誤訊息用字串
  })
  const { login } = useAuth()

  const onLogin = () => {
    console.log(user.email, user.password)
    login(user.email, user.password)
  }

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)
  //一開始showPassword是false關起來，所以顯示閉眼圖示，
  // 點擊圖示後，觸發handleIconClick，showPassword透過setShowPassword(!showPassword)變成true，就會顯示張眼圖示
  // 透過此函數同時可以設定type的屬性
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handlePasswordIconClick = () => {
    setShowPassword(!showPassword) // 切換圖示狀態
    // 表示取反操作，也就是說，如果 showEye 為 false，取反後就會變成 true，因此會顯示 RiEyeLine 圖示。如果 showEye 為 true，取反後就會變成 false，顯示 RiEyeOffLine 圖示。
  }

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    // console.log(e.target.name, e.target.value, e.target.type)

    if (e.target.name === 'agree') {
      setUser({ ...user, [e.target.name]: e.target.checked })
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }

    // ES6特性: 計算得來的屬性名稱(computed property names)
    // [e.target.name]: e.target.value
    // ^^^^^^^^^^^^^^^ 這樣可以動態的設定物件的屬性名稱
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
  }

  const handleSubmit = (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    // 表單檢查 --- START
    // 建立一個新的錯誤物件
    const newErrors = {
      email: '',
      password: '',
    }

    if (!user.email) {
      newErrors.email = 'email為必填'
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
    }
    // if (!user.agree) {
    //   newErrors.agree = '請先同意會員註冊條款'
    // }

    // 呈現錯誤訊息
    setErrors(newErrors)

    // 物件屬性值中有非空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 有錯誤，不送到伺服器，跳出submit函式
    if (hasErrors) {
      return
    }
    // 表單檢查 --- END

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    alert('送到伺服器去')
  }
  return (
    <main className={`${styles['login']}`}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <img
            className={`${styles['main-title']}`}
            src="/images/main-title/login.svg"
            alt="login"
          />
        </div>
        <Star />
        <div className={`${styles['loginsignin']}`}>
          <div className={`${styles['signinsec1']} text-center mb-4 mt-4`}>
            <p className="mb-5">會員登入</p>
            <a className={`${styles['gfast']} btn btn-no-radius`}>
              <GoogleLogo className="mx-3" />
              {/* <img
                className="googlelogo"
                src="/neimages/Google__G__logo.svg.webp"
                alt=""
              /> */}
              <p className="m-0 p-0">快速登入</p>
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
              <p>電子郵件登入</p>
            </div>
            <form
              className={`mb-3 ${styles['register-form']}`}
              onSubmit={handleSubmit}
            >
              <label className="mt-3">
                電子郵件*
                <input
                  type="email"
                  name="email"
                  placeholder="請輸入你的電子郵件"
                  value={user.email}
                  onChange={handleFieldChange}
                />
              </label>
              <span className={`${styles['error']}`}>{errors.email}</span>
              <label className="mt-3">
                密碼*
                <div
                  className={`${styles['inputarea']} "d-flex justify-between"`}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="請輸入你的密碼"
                    value={user.password}
                    onChange={handleFieldChange}
                  />
                  <div>
                    {showPassword ? (
                      <RiEyeLine
                        className={styles['icon']}
                        onClick={handlePasswordIconClick}
                      />
                    ) : (
                      <RiEyeOffLine
                        className={styles['icon']}
                        onClick={handlePasswordIconClick}
                      />
                    )}
                  </div>
                </div>
              </label>
              <span className={`${styles['error']}`}>{errors.password}</span>
              <div
                className={[
                  styles['btn-div'],
                  'm-4 d-flex justify-content-center',
                ].join(' ')}
              >
                <button
                  className={`${styles['btn-in']} mt-4`}
                  type="submit"
                  onClick={onLogin}
                >
                  登入
                </button>
              </div>
            </form>
            <div
              className={`${styles['form-footer']} d-flex justify-content-center`}
            >
              <p className="me-2">尚未有會員帳號?</p>
              <Link href="/member/register">會員註冊</Link>
            </div>
          </div>
        </div>
      </div>
    </main>

    // <main className={`form-member w-100 m-auto text-center`}>
    //   <h2 className="text-center mb-5">會員登入</h2>
    //   <form>
    //     <div className="row mb-3">
    //       <div className="col-sm-12">
    //         <input
    //           type="email"
    //           className={`form-control w-100 ${styles['form-control']} `}
    //           placeholder="電子郵件地址"
    //         />
    //       </div>
    //       <div className={`${styles['error']} my-2 text-start`}>
    //         請輸入有效的電子郵件地址。
    //       </div>
    //     </div>
    //     <div className="row mb-3">
    //       <div className="col-sm-12">
    //         <input
    //           type="password"
    //           className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
    //           placeholder="密碼"
    //         />
    //       </div>
    //       <div className={`${styles['error']} my-2 text-start`}>
    //         請輸入密碼。
    //       </div>
    //     </div>
    //     <div className="row mb-3">
    //       <div className="col-sm-6 text-start">
    //         <div className="form-check">
    //           <input
    //             className="form-check-input"
    //             type="checkbox"
    //             id="gridCheck1"
    //           />
    //           <label
    //             className={`form-check-label  ${styles['notice']}`}
    //             htmlFor="gridCheck1"
    //           >
    //             保持登入狀態
    //           </label>
    //         </div>
    //       </div>
    //       <div className="col-sm-4 offset-sm-2 test-end">
    //         <Link
    //           href="/member/forget-password"
    //           className={`${styles['notice']}`}
    //         >
    //           忘記密碼？
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="row mb-2">
    //       <p className={`${styles['notice']}`}>
    //         如登入，即代表同意本站
    //         <Link href="/about">隱私權政策</Link>和
    //         <Link href="/about">使用條款</Link>。
    //       </p>
    //     </div>

    //     <button type="submit" className="btn btn-primary w-100">
    //       登入
    //     </button>

    //     <div className="row mt-2">
    //       <p className={`${styles['notice']}`}>
    //         還不是會員？
    //         <Link href="/member/register">加入我們</Link>。
    //       </p>
    //     </div>

    //     <div className={`mb-3 ${styles['hr-sect']}`}>快速登入</div>
    //     <div className="row mb-2">
    //       <div className="col-sm-12 text-start">
    //         <div className="d-flex justify-content-center">
    //           <LineLogo className="mx-3" />
    //           <GoogleLogo className="mx-3" />
    //           <FacebookLogo className="mx-3" />
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </main>
  )
}
