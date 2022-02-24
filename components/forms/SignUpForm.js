import { useState } from "react";
import Link from "next/link";
const SignUpSuccess = ({username, loggedIn}) => {
    return (
        <div>
            <div>
                <h2>welcome to chat app,</h2>
                <h2>{ username }</h2>
                <p>your account has been successfully created.</p>
            </div>
            <Link href="/">
                <a>{loggedIn ? "start" : "log in"}</a>
            </Link>
        </div>
    );
}

const SignUpForm = ({handleSubmit}) => {
    return (
        <div>
            <h1>Chat App</h1>

            <div>
                <form onSubmit={handleSubmit}>
                    <label><input type="text" name="fullname" placeholder="Full Name" /></label>
                    <label><input type="text" name="username" placeholder="Username" required /></label>
                    <label><input type="password" name="password" placeholder="Password" autoComplete="off" autoCapitalize="off" required /></label>
                    <button>Sign Up</button>
                </form>

                <div>
                    <span>Have an account?</span>
                    <Link href="/">
                        <a>Log In</a>
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
                    <SignUpForm handleSubmit={handleSubmit} />
            }
        </>
    );
}

export default SignUp;