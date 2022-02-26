import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch("api/accounts/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        }).then(response => {
            if(response.ok) {
                router.reload();
            }

            throw response.json();
        }).catch(err => setErrorMessage(err.message));
    }

    return (
        <div className="flex-col form-container">
            <h1 className="logo">Chatty</h1>
            <div className="flex-col form-wrapper">
                <form className="flex-col form" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            maxLength={40}
                            autoCapitalize="off"
                            required
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            maxLength={40}
                            required
                        />
                    </label>
                    <span className="error">{errorMessage}</span>
                    <button className="trns-all">Log In</button>
                </form>

                <div className="form-nav flex">
                    <span>Don't have an account?</span>
                    <Link href="/accounts/signup">
                        <a>Sign up</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;