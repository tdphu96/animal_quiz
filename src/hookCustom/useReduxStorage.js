import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {STORAGE} from "../mFun";

const useReduxStorage = ({ key, setStateKey }) => {
    const dispatch = useDispatch()
    const [ load, setLoad ] = useState(false);
    const state = useSelector(state => state[key])
    // STORAGE.remove("profile")
    useEffect(() => {
        try {
            setLoad(false);
            STORAGE.get(key).then( async res => {
                console.log(res)
                if (!res) await STORAGE.set(key, state)
                else dispatch(setStateKey(res));
                setLoad(true)
            }).catch(() => setLoad(true))
        } catch (e) {
            STORAGE.set(key, state).then(() => setLoad(true))
        }
    } , []);

    useEffect( () => {
        if (!load) return;
        if (state) { STORAGE.set(key, state).then(() => console.log(key, state)) }
    }, [state, load])

    return state
}

export default useReduxStorage
