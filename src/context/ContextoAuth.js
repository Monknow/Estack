import * as React from "react";
import { createContext } from "react";
import { useAuth } from "gatsby-theme-firebase";

const ContextoAuth = createContext({
    isLoading: true,
    isLoggedIn: false,
    profile: null,
});

export default ContextoAuth;

const AuthProvider = (props) => {
    return (
        <ContextoAuth.Provider value={useAuth()}>
            {props.children}
        </ContextoAuth.Provider>
    );
};

export { AuthProvider };
