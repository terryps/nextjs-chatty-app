import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import TextForm from "./TextForm";
import { getTimeLapsed } from "lib/utils";

const ChatSection = ({ userId, hostInfo }) => {
    const [chatRoomId, setChatRoomId] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id1: userId,
                id2: hostInfo?.id,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setChatRoomId(data.chatRoomId);
            setChatLog(data.chatData);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleLike = async (e, id, liked) => {
        e.preventDefault();

        fetch("api/chat/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId: id, liked: !liked }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }

            setChatLog(
                chatLog.map(el =>
                    el.id===id?{...el, liked: !liked} : el
                )
            );
        }).catch(err => {
            setErrorMessage(err);
        });
    }

    if(error) {
        return (
            <div>
                <h2>error</h2>
                <span>Couldn't load messages.</span>
            </div>
        );
    }

    if(loading) {
        return (
            <div>loading</div>
        )
    }

    return (
        <div className="container">
            <div className="chat-nav flex-row">
                <button onClick={()=>router.push("/")} className="trns-all">
                    <svg className="w-6 h-6" fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="chat-nav-avatar">
                    <span></span>
                </div>
                <div className="flex-col">
                    <h3>{hostInfo.username}</h3>
                    <span>{hostInfo.fullname}</span>
                </div>
            </div>
            

            <div className="chat-container scroll-y flex-col-rev">
                <ul>
                    {
                        chatLog.map(el => (
                            <li key={el.id} className={`chat ${el.senderId===userId? "me" : "other"}`}>
                                {
                                    el.senderId!==userId && 
                                    <div className="chat-avatar">
                                        <span></span>
                                    </div>
                                }

                                <span className="chat-content">{ el.content }</span>
                                <div className="flex-col flex-end">
                                    {
                                        el.senderId!==userId &&
                                        <button onClick={(e)=>handleLike(e,el.id,el.liked)} className="heart">
                                            <svg className="w-6 h-6" fill={el.liked? "#D8565B":"none"} stroke={el.liked ? "#D8565B":"#333"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    }
                                    <span className="chat-time">{getTimeLapsed(el.createdAt)}</span>
                                </div>                            
                            </li>
                        ))
                    }
                </ul>
            </div>
            <TextForm
                chatRoomId={chatRoomId}
                updateLog={(chat) => setChatLog(chatLog.concat(chat))}
            />
        </div>
    );
}

export default connect(state => state)(ChatSection);