import React, {useEffect, useRef, useState} from "react";
const Sound = require('react-native-sound');
const useSound = ({ sound, isPlay=false, volume= 1, loop= true }) => {
    const sRef = useRef(null);
    const initSound = () => new Sound(sound, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        if (isPlay) playSound();
        if (loop) sRef.current.setNumberOfLoops(-1);
    });
    const playSound = (callback=null) => {
        sRef.current.play(callback);
    }
    const stopSound = () => {
        sRef.current.stop();
    };
    const pauseSound = () => {
        sRef.current && sRef.current.pause();
    }
    const setLoop = (numberLoop) => sRef.current && sRef.current.setNumberOfLoops(numberLoop);

    useEffect(() => {
        sRef.current = initSound();
        sRef.current.setVolume(volume);
        if (loop) sRef.current.setNumberOfLoops(-1);
        return () => { sRef.current.release(); };
    }, [sound, isPlay, volume, loop]);
    return { playSound, stopSound, pauseSound, setLoop }
}

export default useSound
