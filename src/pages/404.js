import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// markup
const NotFoundPage = () => {
    return (
        <main>
            <Helmet>
                <title>Page not found</title>
            </Helmet>
        </main>
    );
};

export default NotFoundPage;
