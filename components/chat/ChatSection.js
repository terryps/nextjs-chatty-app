import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { showMessageModal } from "redux/actions/modalActions";

import Link from "next/link";
import Image from "next/image";
import TextForm from "./TextForm";
import { MessageModal } from "components/modals/Modal";
import { getTimeLapsed } from "lib/utils";

const ChatSection = ({ userInfo, hostInfo, showMessageModal }) => {
    const [chatRoomId, setChatRoomId] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetcher = async () => {
        setLoading(true);
        fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hostId: hostInfo?.id,
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
    };

    useEffect(() => {
        fetcher();
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
            showMessageModal("error", err);
        });
    }

    if(error) {
        return (
            <div className="container">
                <div className="top-nav">
                    <Link href="/">
                        <a className="trns-all">
                            <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </a>
                    </Link>
                </div>
                <div className="error">
                    <button onClick={fetcher}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <span>Couldn't load messages.</span>
                </div>
            </div>
        );
    }

    if(loading) {
        return (
            <div className="container">
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="top-nav">
                <Link href="/">
                    <a className="trns-all">
                        <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </a>
                </Link>
                <div className="avatar m-wd-64">
                    <Image src={`/static/avatars/${hostInfo.avatarUrl}.png`} width={48} height={48} />
                </div>
                <div className="flex-col">
                    <h3>{hostInfo.username}</h3>
                    <span>{hostInfo.fullname}</span>
                </div>
            </div>
            

            <div className="chat-wrapper scroll-y">
                <ul className="flex-col">
                    {
                        chatLog.map(el => (
                            <li key={el.id} className={`chat ${el.senderId===userInfo.id? "me" : "other"}`}>
                                {
                                    el.senderId!==userInfo.id && 
                                    <div className="avatar m-wd-56">
                                        <Image src={`/static/avatars/${hostInfo.avatarUrl}.png`} width={42} height={42} />
                                    </div>
                                }

                                <span className="chat-content">{ el.content }</span>
                                <div className="flex-col flex-end">
                                    {
                                        el.senderId!==userInfo.id &&
                                        <button onClick={(e)=>handleLike(e,el.id,el.liked)} className="heart">
                                            <svg fill={el.liked? "#D8565B":"none"} stroke={el.liked ? "#D8565B":"#333"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                showError={(message)=>showMessageModal("error", message)}
            />
            <MessageModal />
        </div>
    );
}

export default React.memo(connect(state => ({
    userInfo: state.userInfo,
    hostInfo: state.hostInfo,
}), {
    showMessageModal
})(ChatSection));