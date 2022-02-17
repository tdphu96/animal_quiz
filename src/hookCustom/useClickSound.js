import useSound from "./useSound";
import click from "../asset/audio/click.mp3";
import {useSelector} from "react-redux";

const useMusicSound = () => {
    const settings = useSelector(state => state.settings);
    const { playSound, stopSound } = useSound({ sound: click, isPlay: false, loop: false });
    const soundClick = () => {
        if (!settings.click) return;
        stopSound();
        playSound(() => stopSound())
    }

    return { soundClick }
}

export default useMusicSound
