import MainBody from "../components/MainBody";
import Hero from "../components/landing/Hero";

import LunarImg from "../assets/img/ocs/lunar-oc.png";

import ControlNav from "../data/control-navigation.json";

function MainPage () {
    return (<>
        <MainBody>
            <Hero
                img={LunarImg}
                shortNav={ControlNav}
            />
        </MainBody>
    </>)
}

export default MainPage;