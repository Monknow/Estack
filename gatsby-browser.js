import * as React from "react";
import { URlProvider } from "./src/context/ContextoURL";
import { AuthProvider } from "./src/context/ContextoAuth";
import EstilosGlobales from "./src/context/EstilosGlobales";
import NavBar from "./src/components/organisms/NavBar";
import Footer from "./src/components/organisms/Footer";

export const wrapPageElement = ({ element, props }) => {
    return (
        <URlProvider {...props}>
            <EstilosGlobales></EstilosGlobales>
            <AuthProvider>
                <NavBar></NavBar>
                {element}
                <Footer></Footer>
            </AuthProvider>
        </URlProvider>
    );
};
