import React from 'react'
import style from './chat.module.css'
import { Navbar } from '../../components/organisms'
import {userprofile} from '../../components/images'

function ChatPage() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className={style["box-side-chat"]}>
              <p className={style["chat-title"]}>Chat</p>
              <div className={style["line-width"]}></div>

              <div className="row">
                <div className="col-3">
                  <img className={style["userimg"]} src={userprofile} alt=""/>
                </div>
                <div className="col">
                  <p className={style["user-name"]}>Jonas Adam</p>
                  <p className={style["message-body"]}>Hey, How is it going?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={style["box-main-chat"]}>
              <img src={userprofile} alt="" className={style["main-userimg"]}/>
              <p className={style["main-username"]}>Jonas adam</p>
              <div className={style["line-width"]}></div>
              <input className={style["input-massage-body"]} type="text" placeholder="type message..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
