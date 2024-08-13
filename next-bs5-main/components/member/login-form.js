/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './member.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Star from '@/components/star/star'
import GoogleLogo from '@/components/icons/google-logo'

export default function LoginForm() {
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
            <form className="mb-3">
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
              <div
                className={[
                  styles['btn-div'],
                  'm-4 d-flex justify-content-center',
                ].join(' ')}
              >
                <button className={`${styles['btn-in']} mt-4`} type="submit">
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
