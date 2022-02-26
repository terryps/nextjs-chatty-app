import { useState } from "react";
import Link from "next/link";
const SignUpSuccess = ({username, loggedIn}) => {
    return (
        <div className="flex-col form-container">
            <div className="flex-col form-wrapper">
                <div className="signup-done">
                    <h3>welcome to chatty,</h3>
                    <h3>{ username }</h3>
                    <p className="m-t-20">Your account has been successfully created.</p>
                </div>

                <div className="form-nav m-t-20 txt-algn-ctr">
                    <Link href="/">
                        <a>{loggedIn ? "start" : "log in"}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const SignUpForm = ({handleSubmit, errorMessage}) => {
    return (
        <div className="flex-col form-container">
            <h1 className="logo">chatty</h1>

            <div className="flex-col form-wrapper">
                <form className="flex-col form" onSubmit={handleSubmit}>
                    <label><input type="text" name="fullname" placeholder="Full Name" /></label>
                    <label><input type="text" name="username" placeholder="Username" required /></label>
                    <label><input type="password" name="password" placeholder="Password" autoComplete="off" autoCapitalize="off" required /></label>
                    <span className="error">{errorMessage}</span>
                    <button className="trns-all">Sign Up</button>
                </form>

                <div className="form-nav flex">
                    <span>Have an account?</span>
                    <Link href="/">
                        <a>log in</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [signupDone, setSignupDone] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        fetch("api/accounts/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        }).then(response => {
            if(response.ok) {
                setSignupDone(true);
            }

            throw response.json();
        }).catch(err => {
            setErrorMessage(err.message);
        });

        fetch("api/accounts/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        }).then(response => {
            if(response.ok) {
                setLoggedIn(true);
                setUsername(e.target.username.value);
            }
        })
    }

    return (
        <>
            {
                signupDone ?
                    <SignUpSuccess username={username} loggedIn={loggedIn} /> :
                    <SignUpForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
            }
        </>
    );
}

export default SignUp;