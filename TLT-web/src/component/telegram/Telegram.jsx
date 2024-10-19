import React from "react";
import "./Telegram.css";
import telegram from "../../assets/telegram.png";

function Telegram() {
  return (
    <div className="">
      {" "}
     <a href="https://t.me/theshubhamsir" target="-blank"  >
        <img src={telegram} className="telegram-img" alt="" />{" "}
      </a>
    </div>
  );
}

export default Telegram;
