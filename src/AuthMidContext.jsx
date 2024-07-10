import { createContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "./redux/store/loginStore.js";
import { useNavigate } from "react-router-dom";
import { webPath as pathRoutes } from "./routes/web.jsx";

const AuthMidContext = createContext();

const AuthProvider = ({ children }) => {
    const isAuthenticated = useSelector(state => state.loginState).isLoggedIn
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookieName = import.meta.env.VITE_COOKIE_NAME
    
    useEffect(() => {
        const hasAccess = Cookie.get(cookieName);

        if (hasAccess) {
            dispatch(changeLoginStatus(true))
        }

        if (!hasAccess && !isAuthenticated) {
            navigate(pathRoutes.login)
        } else {
            navigate(pathRoutes.dashboard)
        }
    }, []);
    
    const loginUser = (token) => {
        Cookie.set(cookieName, token, { expires: 3, secure: true, sameSite: 'strict' });
        dispatch(changeLoginStatus(false))
        navigate(pathRoutes.dashboard)
    };
    
    const logoutUser = () => {
        Cookie.remove(cookieName);
        dispatch(changeLoginStatus(false))
    };

    return (
        <AuthMidContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthMidContext.Provider>
    );
};

export { AuthMidContext, AuthProvider };