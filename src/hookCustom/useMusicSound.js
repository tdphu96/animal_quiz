import useSound from "./useSound";
import music from "../asset/audio/nhac_nen.mp3";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const useMusicSound = () => {
    const settings = useSelector(state => state.settings);
    const { playSound: playMusicSound, stopSound:stopMusicSound } = useSound({ sound: music, isPlay: settings.music, loop: true });
    useEffect( () => {
        console.log('settings.music', settings.music)
        if (settings.music) playMusicSound();
        else stopMusicSound()
    }, [settings.music])

    return settings
}

export default useMusicSound
