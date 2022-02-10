import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import MsgBox from "./components/MsgBox";
import axios from "axios";
import { message } from "antd";

const Message = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const getMyMessage = async () => {
    const list = await axios.post(
      "http://localhost:4000/api/message/getMessage",
      { myId: localStorage.getItem("ruby_user_id") }
    );

    setMessages(list.data);
  };

  useEffect(() => {
    const loginFlag = loginCheck();

    console.log(loginFlag);

    if (!loginFlag) {
      navigate("/");
    }

    getMyMessage();
  }, []);

  return (
    <div>
      <TopNav title="Message" desc="친구 메세지 확인가능..." />

      {messages.map((m) => {
        return (
          <MsgBox
            key={m.id}
            isSend={
              parseInt(m.who) === parseInt(localStorage.getItem("ruby_user_id"))
            }
            content={m.content}
            isRead={m.isRead}
            createdAt={m.createdAt}
            who={m.who}
            whoName={m.whoName}
            whom={m.whom}
            whomName={m.whomName}
          />
        );
      })}

      <MsgBox isSend={true} />
    </div>
  );
};

export default Message;
