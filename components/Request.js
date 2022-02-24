import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Modal, AddFriendModal, MessageModal } from "./modals/Modal";

const Request = ({ userId }) => {
    const [requestList, setRequestList] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [userToAdd, setUserToAdd] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3000/api/requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId }),
        }).then(async response => {
            const data = await response.json();

            if(!response.ok) {
                throw data.message;
            }

            setRequestList(data.requestData);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setLoading(false)
        });
    }, []);

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
    
                setUserToAdd(data.userData);
                setModalIsOpen(true);
                setTextInput("");
            }).catch(err => {
                setErrorMessage(err);
                setShowError(true);
            });
        }
    }

    const handleAdd = async (e, id) => {
        e.preventDefault();

        const config = !!id ? { id: id } : { username : userToAdd?.username };
        
        fetch("api/friends/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userId: userId,
                config: config,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setRequestList(requestList.filter(item => item.id!==data.id));
            setTextInput("");
        }).catch(err => {
            setErrorMessage(err);
            setShowError(true);
        }).finally(() => {
            setModalIsOpen(false);
            setUserToAdd(null);
        });
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();

        fetch("api/requests/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                requesterId: id,
                addresseeId: userId,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setRequestList(requestList.filter(item => item.id!==id));
        }).catch(err => {
            setErrorMessage(err);
            setShowError(true);
        });
    }

    if(error) {
        return (
            <div>
                <p>Failed to load request list. Press reload.</p>
            </div>
        )
    }

    else if(loading) {
        return (<></>);
    }

    else {
        return (
            <div>
                <input
                    type="text"
                    onChange={(e)=>setTextInput(e.target.value)}
                    onKeyPress={handleSubmit}
                    value={textInput}
                    placeholder="Enter a Username"
                    autoCapitalize="off"
                />
    
                <ul>
                    {
                        requestList.map(requester =>
                            <li key={requester.id} className="flex-row">
                                <div></div>
                                <div className="flex-col">
                                    <div><h3>{requester.username}</h3></div>
                                    <div><h3>{requester.fullname}</h3></div>
                                </div>
                                <div className="flex-row">
                                    <button onClick={e=>handleAdd(e, requester.id)}>
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                    <button onClick={e=>handleDelete(e, requester.id)}>
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        )
                    }
                </ul>

                <Modal modalIsOpen={modalIsOpen} handleClose={()=>setModalIsOpen(false)}>
                    <AddFriendModal userInfo={userToAdd} handleAdd={handleAdd} handleClose={()=>setModalIsOpen(false)} />
                </Modal>

                <Modal modalIsOpen={showError} handleClose={()=>{setShowError(false);setErrorMessage("");}}>
                    <MessageModal type="Error" handleClose={()=>{setShowError(false);setErrorMessage("");}}>
                        { errorMessage }
                    </MessageModal>
                </Modal>
            </div>
        );
    }
}

export default connect(state => state)(Request);