import MadeBy from "./info/MadeBy";
import Social from "./info/Social";

export default function Footer () {
    return (
        <footer className="bg-black bg-opacity-80 border-t border-border absolute bottom-0 left-0 w-full">
            <div className="container py-12 text-center">
                <MadeBy className="font-poppins" />
                <div className="mt-8 flex flex-row justify-center gap-3">
                    <Social
                        name="X/Twitter"
                        link="https://twitter.com/NormanAndrians"
                        icon={<i className="bi bi-twitter-x text-3xl"></i>}
                    />
                    <Social
                        name="Instagram"
                        link="https://www.instagram.com/normanandrians25/"
                        icon={<i className="bi bi-instagram text-3xl"></i>}
                    />
                    <Social
                        name="Facebook"
                        link="https://www.facebook.com/profile.php?id=100076314820736"
                        icon={<i className="bi bi-facebook text-3xl"></i>}
                    />
                    <Social
                        name="Github"
                        link="https://github.com/norman-andrians"
                        icon={<i className="bi bi-github text-3xl"></i>}
                    />
                </div>
            </div>
        </footer>
    )
}