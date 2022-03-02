import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { AddFriendModal } from "../modals/Modal";
import { showMessageModal, showAddFriendModal } from "redux/actions/modalActions";

const Request = ({ userToAdd, showMessageModal, showAddFriendModal }) => {
    const [requestList, setRequestList] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [reload, setReload] = useState(false);

    console.log("request")

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:3000/api/requests")
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                throw data.message;
            }

            setRequestList(data.requestData);
        }).catch(err => {
            setError(true);
            setReload(false);
        }).finally(() => {
            setLoading(false);
        });
    }, [reload]);

    const handleSubmit = async (e) => {
        if(e.key === "Enter") {
            fetch("api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: textInput }),
            }).then(async response => {
                const data = await response.json();
    
                if(!response.ok) {
                    throw data.message;
                }
                showAddFriendModal(data.userData);
            }).catch(err => {
                showMessageModal("error", err)
            });

            setTextInput("");
        }
    }

    const handleAdd = async (e, id) => {
        e.preventDefault();
        
        const userIdToAdd = !!id ? id : userToAdd?.id;
        fetch("api/friends/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userIdToAdd: userIdToAdd,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setRequestList(requestList.filter(el => el.id!==userIdToAdd));
            setTextInput("");
        }).catch(err => {
            showMessageModal("error", err);
        });
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();

        fetch("api/requests/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                requesterId: id,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setRequestList(requestList.filter(item => item.id!==id));
        }).catch(err => {
            showMessageModal("error", err);
        });
    }

    if(error) {
        return (
            <div className="error">
                <button onClick={()=>setReload(true)}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
                <span>Couldn't load request list.</span>
            </div>
        )
    }

    else if(loading) {
        return (
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }

    else {
        return (
            <div  className="scroll-y">
                <div className="flex-row req-form">
                    <input
                        type="text"
                        onChange={(e)=>setTextInput(e.target.value)}
                        onKeyPress={handleSubmit}
                        value={textInput}
                        placeholder="Enter a Username"
                        autoCapitalize="off"
                    />
                    <button>add</button>
                </div>
                <div>
                    <ul>
                        {
                            requestList.map(requester =>
                                <li key={requester.id} className="flex-row lst-item">
                                    <div className="avatar m-wd-72">
                                        <Image src={`/static/avatars/${requester.avatarUrl}.png`} width={48} height={48} />
                                    </div>
                                    <div className="lst-prof">
                                        <h3>{requester.username}</h3>
                                        <p>{requester.fullname}</p>
                                    </div>
                                    <div className="flex-row req-btns">
                                        <button onClick={e=>handleAdd(e, requester.id)}>
                                            <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </button>
                                        <button onClick={e=>handleDelete(e, requester.id)}>
                                            <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>

                <AddFriendModal handleAdd={handleAdd} />
            </div>
        );
    }
}

export default connect(
    state => ({ userToAdd: state.addFriendModal.userInfo }),
    { showMessageModal, showAddFriendModal }
)(Request);