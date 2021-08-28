import * as React from "react";
import { createContext } from "react";

const ContextoURL = createContext({ href: "http://localhost:8000" });

export default ContextoURL;

const URlProvider = (props) => {
    return (
        <ContextoURL.Provider value={props.location}>
            {props.children}
        </ContextoURL.Provider>
    );
};

export { URlProvider };
