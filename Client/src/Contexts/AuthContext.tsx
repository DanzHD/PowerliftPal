import {createContext, useContext, useState, useEffect} from "react";
import {BACKEND} from "../common/utils/Constants.tsx";

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

    useEffect(() => {
        checkUserStatus();

    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {

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
            let user = await fetch(`${BACKEND}/log-in`, options);
            setUser(user);
        } catch(error) {
            console.error(error);
        }

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
            const res = await fetch(`${BACKEND}/log-out`, options);

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
            const {username} = await res.json(res);

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
        checkUserStatus
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>loading...</p> : children}
        </AuthContext.Provider>
    )
}
