import atWorkSVG from "../assets/svg/at-work-rafiki.svg";
import notesSVG from "../assets/svg/notes-amico.svg";
import helpfulSingSVG from "../assets/svg/helpful-sign-amico.svg";
import peopleSearchSVG from "../assets/svg/people-search-amico.svg";

const seccionesHome = [
    {
        titulo: "Share your stack",
        subtitulo: "",
        parrafo:
            "Easily share your skills in programming languages, frameworks, dev tools, soft skills, and more!",
        svg: helpfulSingSVG,
        alt: "Woman talking on a megaphone",
    },
    {
        titulo: "Put your goals on paper",
        subtitulo: "",
        parrafo:
            "When you put your goals in writing, you're setting your sights on the destination before you begin. Your life goals become the framework for how you prioritize and manage your time",
        svg: atWorkSVG,
        alt: "Woman writing on her computer",
    },
    {
        titulo: "Track your skills",
        subtitulo: "",
        parrafo:
            "Stack Sharer helps you keep focused on the technologies you want to learn by recording your learning progress.",
        svg: notesSVG,
        alt: "Man writing notes",
    },
    {
        titulo: "Search for other people with specific stacks",
        subtitulo: "",
        parrafo: "Coming soon",
        svg: peopleSearchSVG,
        alt: "Man writing notes",
    },
];

export default seccionesHome;
