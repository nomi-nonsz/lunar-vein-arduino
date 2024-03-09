import Img from "../../assets/img/absurd-closing.png";
import Bg from "../../assets/img/bg-closing.png";

export default function Closing () {
    return (
        <div className="bg-gradient-to-t from-background via-background to-transparent">
            <div className="pt-64 pb-96 bg-no-repeat bg-cover bg-bottom" style={{
                backgroundImage: `url(${Bg})`,
            }}>
                <div className="container">
                    <header className="text-center font-poppins">
                        <h1 className="text-5xl font-bold leading-normal">That's All {":)"}</h1>
                        <div>Other features are still under development</div>
                    </header>
                    <picture className="">
                        <img className="mt-16 w-full h-auto" src={Img} alt="Goofy ahh closing" />
                    </picture>
                </div>
            </div>
        </div>
    )
}