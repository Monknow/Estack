import IconoFacebook from "../assets/svg/iconmonstr-facebook-1.inline.svg";
import IconoTwitter from "../assets/svg/iconmonstr-twitter-1.inline.svg";
import IconoInstagram from "../assets/svg/iconmonstr-instagram-11.inline.svg";
import IconoYouTube from "../assets/svg/iconmonstr-youtube-6.inline.svg";
import IconoLinkedIn from "../assets/svg/iconmonstr-linkedin-1.inline.svg";

const datosRedesSociales = new Map();

datosRedesSociales.set("Facebook", {
	prefijoLink: "https://www.facebook.com/",
	icono: IconoFacebook,
});

datosRedesSociales.set("Twitter", {
	prefijoLink: "https://twitter.com/",
	icono: IconoTwitter,
});

datosRedesSociales.set("Instagram", {
	prefijoLink: "https://www.instagram.com/",
	icono: IconoInstagram,
});

datosRedesSociales.set("YouTube", {
	prefijoLink: "https://www.youtube.com/",
	icono: IconoYouTube,
});

datosRedesSociales.set("LinkedIn", {
	prefijoLink: "https://www.linkedin.com/",
	icono: IconoLinkedIn,
});

export default datosRedesSociales;
