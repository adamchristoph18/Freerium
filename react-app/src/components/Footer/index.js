import "./Footer.css";

function Footer() {
    return (
        <div className="footer-container">
            <div className="name-plus-linkedin">
                <p className="my-name">Adam Tull</p>
                <a href="https://www.linkedin.com/in/adam-tull-a54207a6/" target="_blank">
                    <i className="brand-icon fa-brands fa-linkedin clickable" /></a>
                <a href="https://github.com/adamchristoph18" target="_blank">
                    <i className="brand-icon fa-brands fa-github clickable" /></a>
            </div>
            <div className="technologies-container">
                <p className="footer-technologies">JavaScript - React - Redux - AWS S3 - Python - Flask - PostgreSQL</p>
            </div>
            <p className="site-year">@2023</p>
        </div>
    )
}

export default Footer;
