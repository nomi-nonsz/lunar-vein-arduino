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
import ControlServo from "../components/landing/ControlServo";
import Closing from "../components/landing/Closing";
import Footer from "../components/Footer";

function MainPage () {
    const led = useRef<HTMLDivElement | null>(null);
    const rgbLed = useRef<HTMLDivElement | null>(null);
    const piezo = useRef<HTMLDivElement | null>(null);
    const servo = useRef<HTMLDivElement | null>(null);
    const photoresistor = useRef<HTMLDivElement | null>(null)

    return (<>
        <MainBody>
            <Hero
                img={LunarImg}
                refs={[led, rgbLed, piezo, servo, photoresistor]}
                shortNav={ControlNav}
            />
            <ControlLED refto={led} />
            <ControlRgbLed refto={rgbLed} />
            <ControlPiezo refto={piezo} />
            <ControlServo refto={servo} />
            <ControlPhotoresistor refto={photoresistor} />
            <Closing />
            <Footer />
        </MainBody>
    </>)
}

export default MainPage;