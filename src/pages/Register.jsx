import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const existDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/register`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                phone_number: phoneNumber,
                address: address,
                password: password,
                first_name: firstName,
                last_name: lastName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo && authInfo.token) {
                    localStorage.setItem("cook_token", JSON.stringify(authInfo))
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleRegister}>
                    <h1 className="text-4xl mt-7 mb-3">Quick Cooks</h1>
                    <h2 className="text-xl mb-10">Register new account</h2>
                    <fieldset className="mb-4">
                        <label htmlFor="firstName"> First name </label>
                        <input type="text" id="firstName"
                            value={firstName}
                            onChange={evt => setFirstName(evt.target.value)}
                            className="form-control"
                            placeholder="First Name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="lastName"> Last name </label>
                        <input type="text" id="lastName"
                            value={lastName}
                            onChange={evt => setLastName(evt.target.value)}
                            className="form-control"
                            placeholder="Last Name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" id="inputEmail"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="phone-number"> Phone Number </label>
                        <input type="text" id="phone-number"
                            value={phoneNumber}
                            onChange={evt => setPhoneNumber(evt.target.value)}
                            className="form-control"
                            placeholder="Phone Number"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="address"> Address </label>
                        <input type="text" id="address"
                            value={address}
                            onChange={evt => setAddress(evt.target.value)}
                            className="form-control"
                            placeholder="Address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="username"> Username </label>
                        <input type="text" id="username"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100">
                            Register
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="loginLinks">
                <section className="link--register">
                    <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/login">Already have an account?</Link>
                </section>
            </div>
        </main>
    )
}
