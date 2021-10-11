import atWorkSVG from "../assets/svg/at-work-rafiki.svg";
import notesSVG from "../assets/svg/notes-amico.svg";
import helpfulSingSVG from "../assets/svg/helpful-sign-amico.svg";
import peopleSearchSVG from "../assets/svg/people-search-amico.svg";

const seccionesHome = [
	{
		titulo: "Search for other people with specific stacks",
		subtitulo: "",
		parrafo: "Look for developer with the skills you need",
		svg: peopleSearchSVG,
		alt: "Man writing notes",
	},
	{
		titulo: "Share your stack",
		subtitulo: "",
		parrafo: "Easily share your skills in programming languages, frameworks, dev tools, soft skills, and more!",
		svg: helpfulSingSVG,
		alt: "Woman talking on a megaphone",
	},
	{
		titulo: "Put your goals on paper",
		subtitulo: "",
		parrafo:
			"When you put your goals in writing, you're are creatin a framework for how you prioritize and manage your learning time",
		svg: atWorkSVG,
		alt: "Woman writing on her computer",
	},
	{
		titulo: "Track your skills",
		subtitulo: "",
		parrafo:
			"eStack Sharer helps you keep focused on the technologies you want to learn by recording your learning progress.",
		svg: notesSVG,
		alt: "Man writing notes",
	},
];

export default seccionesHome;
