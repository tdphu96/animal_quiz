import {useEffect, useState} from 'react';
import {Dimensions, Keyboard} from 'react-native';
const {height, width} = Dimensions.get('screen')
const useHeightKeyBoard = () => {
    const [ keyBoardHeight, setKeyBoardHeight ] = useState(0)
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = (e) => {
        setKeyBoardHeight(height - e.endCoordinates.screenY);
    };
    const _keyboardDidHide = () => {
        setKeyBoardHeight(0);
    };
    return keyBoardHeight
}

export default useHeightKeyBoard
