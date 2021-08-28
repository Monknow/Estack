const opciones = new Map();

opciones.set("Languages", {
    title: "Languages",
    options: ["HTML", "CSS", "JavaScript", "Java", "Pyhton", "PHP"],
});

opciones.set("Databases", {
    title: "Databases",
    options: [
        "Oracle",
        "Microsoft SQL",
        "Microsoft Access",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "SAP Hana",
        "Elasticsearch",
        "IBM DB2",
        "SQL",
        "ClusterControl",
        "CouchDB",
        "MariaDB",
    ],
});

opciones.set("Package Managers", {
    title: "Package Managers",
    options: [
        "npm",
        "yarn",
        "bower",
        "ender",
        "JSPM",
        "Gulp",
        "Jam",
        "PNPM",
        "Volo",
    ],
});

opciones.set("CSS Frameworks", {
    title: "CSS Frameworks",
    options: [
        "Tailwind CSS",
        "Bootstrap",
        "Pure CSS",
        "Bulma CSS",
        "Foundation CSS",
        "Skeleton CSS",
        "Materialize CSS",
        "Tachyons",
        "Semantic UI",
        "UIKit",
        "Primer CSS",
        "Ant Design",
        "Miligram CSS",
    ],
});

opciones.set("CSS Preprocessors", {
    title: "CSS Preprocessors",
    options: [
        "Sass",
        "Less",
        "Stylus",
        "Post CSS",
        "CSSnext",
        "Stylecow",
        "Rework",
        "Sly",
        "SCSS",
        "Garden",
        "CSS-Crush",
        "Pleease",
        "styled-components",
    ],
});

export default opciones;
