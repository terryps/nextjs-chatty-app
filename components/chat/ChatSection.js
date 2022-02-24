import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextForm from "./TextForm";

const ChatSection = ({ userId, hostInfo }) => {
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
            setChatLog(data.chats);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        })
    });

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
        <div>
            {/* <ul>
                {
                    chatLog.map(el => (
                        <li key={el.id}>
                            <div>
                                <span></span>
                            </div>

                            <div>
                                <span>{ el.content }</span>

                                <div>
                                    <span>time</span>
                                    <span>like</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <TextForm
                updateLog={(chat) => setChatLog(chatLog.concat(chat))}
            /> */}
        </div>
    );
}

export default connect(state => state)(ChatSection);