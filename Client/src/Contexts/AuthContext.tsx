import {createContext, useContext, useState, useEffect} from "react";
import {BACKEND} from "../common/utils/Constants.tsx";
import Loading from "../Pages/Loading.tsx";

const AuthContext = createContext(null);

export function useAuthContext() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used within an AuthContextProvider"
        )
    }
    return context;
}

export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);

    useEffect(() => {
        checkUserStatus();

    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);

        const {username, password} = userInfo;
        const options = {
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
        if (res['status'] === 401) {
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

            const options = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }
            await fetch(`${BACKEND}/log-out`, options);

            setUser(null);

        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }

    const registerUser = () => {}

    const checkUserStatus = async () => {
        setLoading(true);
        try {
            const options = {
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
        invalidLogin
    }

    return (
        <AuthContext.Provider value={contextData}>

            { loading ? <Loading /> : children }
        </AuthContext.Provider>
    )
}
