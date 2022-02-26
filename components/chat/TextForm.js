import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const SETTINGS = {
    MIN_ROWS : 1,
    MAX_ROWS : 6,
    LINE_HEIGHT : 18,
    HEIGHT_OFFSET : 32,
};

const TextForm = ({ userId, chatRoomId, updateLog }) => {
    const router = useRouter();

    const [textInput, setTextInput] = useState("");
    const [error, setError] = useState(false);

    const [rows, setRows] = useState(SETTINGS.MIN_ROWS);
    const submitButton = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const handleEnter = (e) => {
        if(e.key==="Enter" && !e.shiftKey) {
            e.preventDefault();
            submitButton.current.click();
        }
        };

        const handleRouteChange = () => {
            textareaRef.current.removeEventListener("keypress", handleEnter, false)
        };

        textareaRef.current.addEventListener("keypress", handleEnter,false);

        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        }
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();

        fetch("api/chat/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chatRoomId: chatRoomId,
                content: textInput,
                senderId: userId,
            }),
            }).then(async response => {
                const data = await response.json();
                if(!response.ok) {
                    throw data.message;
                }
                updateLog(data.newChat);
                setTextInput("");
            }).catch(e => {
                setError(true);
        });
    }

    const handleChange = (e) => {
        const prevRows = rows;
        e.target.rows = SETTINGS.MIN_ROWS;
        const currRows = Math.floor((e.target.scrollHeight-SETTINGS.HEIGHT_OFFSET) / SETTINGS.LINE_HEIGHT);

        if(currRows === prevRows) {
            e.target.rows = currRows;
        }
        
        if(currRows >= SETTINGS.MAX_ROWS) {
            e.target.rows = SETTINGS.MAX_ROWS;
            e.target.scrollTop = e.target.scrollHeight;
        }
        
        // use set state to re-render this component
        setRows((currRows < SETTINGS.MAX_ROWS) ? currRows : SETTINGS.MAX_ROWS);

        setTextInput(e.target.value);
    };

  return (
    <form onSubmit={handleSend} className="textform">
        <textarea
            placeholder="Add a comment..."
            autoComplete="off"
            autoCapitalize="off"
            rows={rows}
            value={textInput}
            onChange={handleChange}
            ref={textareaRef}
        />
        <button disabled={!textInput} ref={submitButton}>Send</button>
    </form>
  );
}

export default connect(state => state)(TextForm);