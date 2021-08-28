"use strict";

module.exports = [
    {
        path: "/users", // the url of the page, example /post/post-slug
        collection: "users", // the name of the collection from firestore
        param1: "username",
        param2: "slug",
        context: ["name", "email", "username", "stack", "slug"], // the fields from the collection that will be requested at build time, then you can access the data from this.props.pageContext
        fileName: "stackTemplate", // the file from pages folder
    },
];
