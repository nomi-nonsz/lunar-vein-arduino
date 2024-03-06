import Button from "../forms/Button";
import NolaImg from "../../assets/img/ocs/nola_3.png";

type ShortNav = {
    name: string,
    target: string
}

interface InHero {
    img: string;
    shortNav: ShortNav[]
}

function Hero ({ img, shortNav }: InHero) {
    return (
        <div className="h-screen container flex items-center">
            <div className="container-grid items-center relative">
                <div className="col-span-4">
                    <h2 className="font-poppins text-6xl font-bold leading-normal">
                        Lunar Vein: Arduino Client
                    </h2>
                    <p className="font-poppins text-xl">
                        Open-source API Based serial communication, it helps you testing the arduino board and some components without any code.
                        <small className="text-xs"> i don't even know anything about electronics and some IoT stuff lol</small>
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                        {shortNav.map(({ name }, i) => (
                            <Button key={i} className="text-sm">{name}</Button>
                        ))}
                    </div>
                    <div className="absolute left-0 -bottom-24">
                        Made By
                        <img className="inline" src={NolaImg} />
                        Norman Andrians
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-3">
                    <picture title="Lunar">
                        <img
                            className="w-full h-auto"
                            src={img}
                            alt="Lunar"
                            srcSet={img}
                        />
                    </picture>
                </div>
            </div>
        </div>
    )
}

export default Hero;