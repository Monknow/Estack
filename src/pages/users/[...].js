import * as React from "react";
import { Router } from "@reach/router";
import StackTemplate from "../../templates/stackTemplate";

const UsersPage = () => {
    return (
        <div>
            <Router basepath="/users">
                <StackTemplate path="/:slug"></StackTemplate>
            </Router>
        </div>
    );
};

export default UsersPage;
