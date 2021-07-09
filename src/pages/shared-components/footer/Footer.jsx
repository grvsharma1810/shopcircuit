import "./footer.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { getLanguageLabel } from "../../../utils/getLanguageLabel";
import { useLocalisation } from "../../../providers/LocalisationProvider";

const Footer = () => {
    const {
        localisationState: { languageIndex },
    } = useLocalisation();

    return (
        <footer className="footer p-1 text-center">
            <div>{getLanguageLabel("connect_with_us",languageIndex)}</div>
            <div>
                <a
                    class="btn-solid"
                    href="https://www.linkedin.com/in/gaurav-kr-sharma/"
                >
                    <LinkedInIcon />
                </a>
                <a
                    class="btn-solid"
                    href="https://www.twitter.com/in/sharma_codes/"
                >
                    <TwitterIcon />
                </a>
                <a
                    class="btn-solid"
                    href="https://www.instagram.com/be_a_sharma/"
                >
                    <InstagramIcon />
                </a>
            </div>
            <div>&#169; 2021 ShopCircuit.netlify.app</div>
        </footer>
    );
};

export default Footer;
