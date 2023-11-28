import {useAuthContext} from "../../../Contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";



function Login() {
    const navigate = useNavigate();
    const {user, loginUser} = useAuthContext();


    const loginForm = useRef(null);


    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = loginForm.current.username.value;
        const password = loginForm.current.password.value;
        const userInfo = {username: username, password: password}
        loginUser(userInfo);
    }

    return (
        <>
            <form ref={loginForm} onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    required
                    type='text'
                    name='username'
                />

                <label>Password</label>
                <input
                    required
                    type='password'
                    name='password'
                />

                <button type='submit' />
            </form>
        </>
    )


}

export default Login;