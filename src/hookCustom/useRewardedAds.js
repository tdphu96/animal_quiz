import React from "react";
import {useEffect, useRef, useState} from "react";
import { RewardedAd, RewardedAdEventType } from "@react-native-firebase/admob";
import {Alert} from "react-native";
import {useDispatch, useSelector} from "react-redux";


const mCodeAds = "ca-app-pub-8956847995269096/5635572119"
const types = {
    loaded: RewardedAdEventType.LOADED,
    earned_reward: RewardedAdEventType.EARNED_REWARD,
    closed: "closed",
    opened: "opened",
}
const coinRewarded = 10;
const useRewardedAds = ({ key, setStateKey }) => {
    const dispatch = useDispatch();
    const value = useSelector( state => state.profile[key])
    let ads = useRef(null);
    const [rewarded, setRewarded ] = useState(0)
    const init = () => RewardedAd.createForAdRequest(mCodeAds);
    const load = () => { ads.current.load() }
    const show = () => {
        if (!ads.current.loaded) return;
        ads.current.show();
    }

    useEffect(() => {
        ads.current = init();
        load();
    }, []);
    useEffect(() => {
        ads.current.onAdEvent((type, error, data) => {
            if (error) {
                return Alert.alert(
                    "Hiện chưa có quảng cáo",
                    "Quay lại sau nhé !!",
                    [
                        {
                            text: "OK",
                            onPress: () => { load() },
                            style: "cancel",
                        },
                    ],
                );
            }
            if (type === types.earned_reward) {
                setRewarded(coinRewarded)
            }
            if (type === types.closed) {
                ads.current = init();
                load();
                setRewarded(0)
            }
        })
    }, [ads.current])

    useEffect(() => {
        if (rewarded>0) dispatch(setStateKey(value + rewarded))
    }, [rewarded]);

    return { showRewardedAds: show  }
}

export default useRewardedAds
