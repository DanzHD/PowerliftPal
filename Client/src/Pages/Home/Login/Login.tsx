import {useAuthContext} from "../../../Contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";
import './_login.scss'
import Button from "../../../common/components/Button/Button.tsx";


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

    const handleExampleUserSubmit = (e) => {
        e.preventDefault();
        const username = 'SampleUser';
        const password = 'Password';
        const userInfo = {username: username, password: password}
        loginUser(userInfo);
    }

    return (
        <>
            <div className='page-container'>

                <div className='login-container' >

                    <div className='login-header'>
                        logo
                    </div>

                    <form ref={loginForm} onSubmit={handleSubmit}>
                        <div className='input-label-pair'>

                            <label>Username</label>
                            <input
                                required
                                type='text'
                                name='username'
                                placeholder='Enter Username'
                            />
                        </div>

                        <div className='input-label-pair'>

                            <label>Password</label>
                            <input
                                required
                                type='password'
                                name='password'
                                placeholder='Password'
                            />
                        </div>

                        <Button type='submit' >Login</Button>
                        <Button type='button' onClick={handleExampleUserSubmit}>Log in as example user</Button>
                        <Button type='button'>Sign up</Button>
                    </form>
                </div>

            </div>
        </>
    )


}

export default Login;