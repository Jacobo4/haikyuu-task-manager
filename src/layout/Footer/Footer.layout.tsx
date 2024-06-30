import { FaFacebook, FaTwitter, FaGithub} from "react-icons/fa";

function Footer() {
    return (
        <footer className="flex justify-between items-center p-4">
            <p>&copy; 2021 Task Manager</p>
            <div className="flex space-x-2">
                <a href="https://www.facebook.com">
                    <FaFacebook/>
                </a>
                <a href="https://www.twitter.com">
                    <FaTwitter/>
                </a>
                <a href="https://www.github.com">
                    <FaGithub/>
                </a>
            </div>
        </footer>
    )
}

export default Footer;