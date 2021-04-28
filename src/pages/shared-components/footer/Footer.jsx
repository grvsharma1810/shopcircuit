import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer p-1 text-center">
            <div>Contact With Us</div>
            <div>
                <a
                    class="btn-solid"
                    href="https://www.linkedin.com/in/gaurav-kr-sharma/"
                >
                    <i class="fa fa-linkedin"></i>
                </a>
                <a
                    class="btn-solid"
                    href="https://www.twitter.com/in/sharma_codes/"
                >
                    <i class="fa fa-twitter"></i>
                </a>
                <a
                    class="btn-solid"
                    href="https://www.instagram.com/be_a_sharma/"
                >
                    <i class="fa fa-instagram"></i>
                </a>
            </div>
            <div>&#169; 2021 ShopCircuit.netlify.app</div>
        </footer>
    );
};

export default Footer;
