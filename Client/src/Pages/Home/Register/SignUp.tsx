import './_signup.scss';
import Text from "../../../common/components/Text/Text.tsx";
import Button from "../../../common/components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useAuthContext} from "../../../Contexts/AuthContext.tsx";
import {DUPLICATE, INVALID_PASSWORD, INVALID_USERNAME} from "../../../common/utils/Constant.tsx";

function SignUp() {
    const signUpForm = useRef(null);
    const {
        registerUser,
        user,
        invalidUsername,
        invalidPassword,
        setInvalidUsername,
        setInvalidPassword
    } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, []);

    const handleSubmit =  async (e) => {
        try {
            e.preventDefault();
            setInvalidUsername(null);
            setInvalidPassword(null);

            const username = signUpForm.current.username.value;
            const password = signUpForm.current.password.value;
            const userInfo = {
                username: username,
                password: password
            }
            await registerUser(userInfo);
        } catch (err) {

            if (err.code === INVALID_USERNAME) {
                setInvalidUsername(err['message']);
            }
            if (err.code === INVALID_PASSWORD) {
                setInvalidPassword(err['message']);
            }
            if (err.code === DUPLICATE) {
                console.log(err['message'])
                setInvalidUsername(err['message'])
            }
            console.error(err);
        }
    }

    return (
        <div className='signup-page-container' >
            <div className='signup-container'>

                <div className='signup-header'>
                    <Text heading={true}>PowerliftPal</Text>
                </div>

                <form ref={signUpForm} onSubmit={handleSubmit}>
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
                    {invalidUsername && <Text styles={{color: 'red'}}>{invalidUsername}</Text> }
                    {invalidPassword && <Text styles={{color: 'red'}}>{invalidPassword}</Text> }
                    <Button type='submit' >Create Account</Button>
                    <Text>Already have an account? <Link to='/login'>Login</Link></Text>
                </form>

            </div>
        </div>
    )
}

export default SignUp;