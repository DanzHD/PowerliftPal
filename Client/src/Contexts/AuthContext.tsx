import {createContext, useContext, useState, useEffect} from "react";
import {BACKEND} from "../common/utils/Constants.tsx";
import Loading from "../Pages/Loading.tsx";
import {
    DUPLICATE,
    INVALID_PASSWORD,
    INVALID_USERNAME, SUCCESS, UNAUTHORIZED

} from "../common/utils/Constant.tsx";

interface IAuthContext {

    user: String,
    setUser: Function,
    loginUser: Function,
    logoutUser: Function,
    registerUser: Function,
    checkUserStatus: Function,
    invalidLogin: Boolean,
    invalidUsername: String,
    invalidPassword: String,
    setInvalidUsername: Function,
    setInvalidPassword: Function

}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuthContext() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthContextProvider"
        )
    }
    return context;
}

export function AuthContextProvider({ children }: {children: any}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');

    useEffect(() => {
        checkUserStatus();

    }, []);

    const loginUser = async (userInfo: {username: String, password: String}) => {
        setLoading(true);

        const {username, password} = userInfo;
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include'
        }

        let res = await fetch(`${BACKEND}/log-in`, options);
        if (res['status'] === UNAUTHORIZED) {
            setLoading(false);
            setInvalidLogin(true);
            throw new Error('unauthorized');
        }

        let {username: user} = await res.json();
        setUser(user);
        setInvalidLogin(false);

        setLoading(false);

    }

    const logoutUser = async () => {
        setLoading(true);

        try {

            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }
            await fetch(`${BACKEND}/log-out`, options);

            setUser('');

        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }

    const registerUser = async (userInfo: {username: String, password: String}) => {
        setLoading(true);
        const MINIMUM_PASSWORD_LENGTH = 8;
        const MINIMUM_USERNAME_LENGTH = 1;

        if (userInfo['username'].length < MINIMUM_USERNAME_LENGTH) {
            setLoading(false);
            const error: any = Error("Username is too short");
            error.code = INVALID_USERNAME;
            throw error;
        }
        if (userInfo['password'].length < MINIMUM_PASSWORD_LENGTH) {
            setLoading(false);
            const error: any = Error("Password must have a minimum of 8 characters");
            error.code = INVALID_PASSWORD;
            throw error;

        }

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: userInfo['username'],
                password: userInfo['password']
            })
        }

        const res = await fetch(`${BACKEND}/sign-up`, options);
        if (res['status'] === DUPLICATE) {
            setLoading(false);
            const error: any = new Error('Duplicate username');
            error.code = DUPLICATE;
            throw error;
        }

        if (res['status'] !== SUCCESS) {
            setLoading(false);
            const error: any = new Error();
            error.code = res['status'];
            throw error;
        }

        await loginUser(userInfo);
        setLoading(false);


    }

    const checkUserStatus = async () => {
        setLoading(true);
        try {
            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }
            const res = await fetch(`${BACKEND}/username`, options);
            const {username} = await res.json();

            setUser(username);


        } catch(error) {
            console.error(error);
        }

        setLoading(false);
    }

    const contextData = {
        user,
        setUser,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus,
        invalidLogin,
        invalidUsername,
        invalidPassword,
        setInvalidUsername,
        setInvalidPassword
    }

    return (
        <AuthContext.Provider value={contextData}>

            { loading ? <Loading /> : children }
        </AuthContext.Provider>
    )
}
