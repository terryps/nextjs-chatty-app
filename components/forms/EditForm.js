import { useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export const EditForm = ({ userInfo }) => {
    const [number, setNumber] = useState(userInfo?.avatarUrl ? parseInt(userInfo.avatarUrl) : 0);
    const [nameInput, setNameInput] = useState(userInfo?.fullname ? userInfo.fullname : "");
    const [usernameInput, setUsernameInput] = useState(userInfo?.username);
    const [aboutInput, setAboutInput] = useState(userInfo?.about ? userInfo.about : "");
    const [edited, setEdited] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const add = e => {
        e.preventDefault();
        setNumber((number+1)%6);
        setEdited(true);
    }

    const sub = e => {
        e.preventDefault();
        setNumber((number+5)%6);
        setEdited(true);
    }

    const handleName = e => {
        e.preventDefault();
        setNameInput(e.target.value);
        setEdited(true);
    }

    const handleUsername = e => {
        e.preventDefault();
        setUsernameInput(e.target.value);
        setEdited(true);
    }

    const handleAboutInput = e => {
        e.preventDefault();
        setAboutInput(e.target.value);
        setEdited(true);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        fetch("http://localhost:3000/api/user/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                about: e.target.about.value,
                avatarUrl: number,
            }),
        }).then(async response => {
            const data = await response.json();
            if(!response.ok) { throw data.message; }
            setEdited(false);
            setErrorMessage("");
        }).catch(err => {
            setErrorMessage(err);
        })
    }

    return (
        <>
            <div className="form-container">
                <div className="top-nav">
                    <Link href="/">
                        <a>
                            <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </a>
                    </Link>
                    <h3>Edit Profile</h3>
                </div>
                <div className="form-wrapper">
                    <form className="edit-form" onSubmit={handleSubmit}>
                        <div className="edit-avatar">
                            <div className="avatar">
                                <Image src={`/static/avatars/${number}.png`}width={72} height={72} />
                            </div>
                            <div className="avatar-controller">
                                <button onClick={add}>
                                    <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7">
                                        </path>
                                    </svg>
                                </button>
                                <button onClick={sub}>
                                    <svg fill="none" stroke="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <label htmlFor="fullname">name</label>
                        <input type="text" id="fullname" name="fullname" value={nameInput} maxLength={40} autoCapitalize="off" onChange={handleName} />

                        <label htmlFor="username">username</label>
                        <input type="text" id="username" name="username" value={usernameInput} minLength={8} maxLength={40} autoCapitalize="off" required onChange={handleUsername} />

                        <label htmlFor="about">about</label>
                        <textarea id="about" name="about" value={aboutInput} rows="3" maxLength={80} onChange={handleAboutInput} />

                        <span className="form-error">{errorMessage}</span>
                        <button className={`form-btn ${!edited && "inactivated"} trns-all`} disabled={!edited}>save</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default connect(state=>({
    userInfo: state.userInfo,
}))(EditForm);