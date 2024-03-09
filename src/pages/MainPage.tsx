import { useRef } from "react";
import MainBody from "../components/MainBody";

// Section components
import Hero from "../components/landing/Hero";
import ControlLED from "../components/landing/ControlLED";

import LunarImg from "../assets/img/ocs/lunar-oc.png";

import ControlNav from "../data/control-navigation.json";
import ControlRgbLed from "../components/landing/ControlRgbLed";
import ControlPiezo from "../components/landing/ControlPiezo";
import ControlPhotoresistor from "../components/landing/ControlPhotoresistor";

function MainPage () {
    const led = useRef<HTMLDivElement | null>(null);
    const rgbLed = useRef<HTMLDivElement | null>(null);
    const piezo = useRef<HTMLDivElement | null>(null);

    return (<>
        <MainBody>
            <Hero
                img={LunarImg}
                refs={[led, rgbLed, piezo]}
                shortNav={ControlNav}
            />
            <ControlLED refto={led} />
            <ControlRgbLed refto={rgbLed} />
            <ControlPiezo refto={piezo} />
            <ControlPhotoresistor />
        </MainBody>
    </>)
}

export default MainPage;