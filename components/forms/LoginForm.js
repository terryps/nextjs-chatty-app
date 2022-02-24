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
        <div>
            <h1>Chat App</h1>
            <div>
                <form onSubmit={handleSubmit}>
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
                    <span>{errorMessage}</span>
                    <button>Log In</button>
                </form>

                <div>
                    <span>Don't have an account?</span>
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;