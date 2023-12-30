import {useAuthContext} from "../../../Contexts/AuthContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import './_login.scss'
import Button from "../../../common/components/Button/Button.tsx";
import Text from "../../../common/components/Text/Text.tsx";


function Login() {

    const navigate = useNavigate();
    const {user, loginUser, invalidLogin} = useAuthContext();

    const loginForm = useRef(null);


    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, []);

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const username = loginForm.current.username.value;
            const password = loginForm.current.password.value;
            const userInfo = {username: username, password: password};
            await loginUser(userInfo);
        } catch (err) {
            console.error(err);
        }
    }


    const handleExampleUserSubmit = async (e) => {
        try {

            e.preventDefault();

            const username = 'SampleUser';
            const password = 'Password';
            const userInfo = {username: username, password: password}
            await loginUser(userInfo);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className='page-container'>

                <div className='login-container' >

                    <div className='login-header'>
                        <Text heading={true}> PowerliftPal </Text>
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
                        {invalidLogin && <Text styles={{color: 'red'}}> Invalid username or password. Please try again. </Text>}
                        <Button type='submit' >Login</Button>
                        <Button type='button' onClick={handleExampleUserSubmit}>Log in as example user</Button>
                        <Text>Don't have an account? <Link to='/signup'>Sign up</Link></Text>
                    </form>
                </div>

            </div>
        </>
    )


}

export default Login;