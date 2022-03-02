import { useState } from "react";
import Link from "next/link";
const SignUpSuccess = ({username}) => {
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="signup-done">
                    <h3>welcome to chatty,</h3>
                    <h3>{ username }</h3>
                    <p className="m-t-16">Your account has been successfully created.</p>
                </div>

                <div className="form-nav m-t-20 txt-algn-ctr">
                    <Link href="/">
                        <a>start</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const SignUpForm = ({handleSubmit, errorMessage}) => {
    return (
        <div className="form-container">
            <h1 className="logo">chatty</h1>

            <div className="form-wrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <label><input type="text" name="fullname" maxLength={40} placeholder="Full Name" /></label>
                    <label><input type="text" name="username" minLength={8} maxLength={40} placeholder="Username" required /></label>
                    <label><input type="password" name="password" minLength={4} maxLength={80} placeholder="Password" autoComplete="off" autoCapitalize="off" required /></label>
                    <span className="form-error">{errorMessage}</span>
                    <button className="form-btn trns-all">Sign Up</button>
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

const SignUpProcess = () => {
    const [username, setUsername] = useState("");
    const [signupDone, setSignupDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/api/accounts/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: e.target.fullname.value,
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        }).then(async (response) => {
            const data = await response.json();
            if(!response.ok) {
                throw data.message;
            }
            setSignupDone(true);
        }).catch(err => {
            setErrorMessage(err);
        });

        fetch("http://localhost:3000/api/accounts/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        }).then(response => {
            if(response.ok) {
                setUsername(e.target.username.value);
            }
        });
    }

    return (
        <>
            {
                signupDone ?
                    <SignUpSuccess username={username} /> :
                    <SignUpForm handleSubmit={handleSubmit} errorMessage={errorMessage} />
            }
        </>
    );
}

export default SignUpProcess;