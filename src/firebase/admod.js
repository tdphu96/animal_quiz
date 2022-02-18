import admob, {
    AdEventType,
    BannerAd, BannerAdSize, InterstitialAd, MaxAdContentRating, RewardedAd, RewardedAdEventType,
    TestIds
} from '@react-native-firebase/admob';
import React, {useEffect, useRef} from "react";

const codeBanner = "ca-app-pub-8956847995269096/8784974477"
export const AdBanner = ({ unitId=codeBanner }) => {
    const adUnitId = unitId ? unitId : TestIds.BANNER;
    return (
        <BannerAd
            unitId={codeBanner}
            size={BannerAdSize.FULL_BANNER}
            // requestOptions={{
            //     requestNonPersonalizedAdsOnly: false,
            // }}
        />
    );
}

let ADMOD = {}

ADMOD.AdEventType = {
    loaded: RewardedAdEventType.LOADED,
    earned_reward: RewardedAdEventType.EARNED_REWARD,
    closed: "closed",
    opened: "opened",
}

const mCodeAds = "ca-app-pub-8956847995269096/5635572119"
let ads = null;
ADMOD.Rewarded = {
    init: (codeAds=mCodeAds) => {
        ads = RewardedAd.createForAdRequest(codeAds);
        ads.load();
        return ads
    },
    load: () => { if (!ads.loaded) ads.load() },
    show: () => {
        if(ads.loaded) ads.show()
        else ads.load()
    },
    onAdEvent: (fun) => ads && ads.onAdEvent(fun), //type, error, data
}

// ADMOD.Rewarded = {
//     init: (codeAds=mCodeAds) => {
//         return RewardedAd.createForAdRequest(codeAds);
//     },
//     load: (ads) => { if (!ads.loaded) ads.load() },
//     show: (ads) => {
//         if(ads.loaded) {
//             ads.show();
//             ADMOD.Rewarded.init();
//         }
//         else {
//             ads.load();
//         }
//     },
//     onAdEvent: (ads,fun) => ads.onAdEvent(fun), //type, error, data
// }


ADMOD.Interstitial = {
    init: (codeAds=TestIds.INTERSTITIAL) => {
        const ads = RewardedAd.createForAdRequest(codeAds);
        ads.load();
        return ads
    },
    onAdEvent: (ads, fun) => ads.onAdEvent(fun), //type, error, data
}


export default ADMOD
//
// const adUnitIdINTERSTITIAL = 'ca-app-pub-8956847995269096/5872030432';
// const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
// export const useAdInterstitial = () => {
//     useEffect(() => {
//         const eventListener = interstitial.onAdEvent(async (type, error, reward) => {
//             if (type === AdEventType.LOADED) {
//                 const res = await interstitial.show();
//             }
//         });
//         admob().setRequestConfiguration({
//                 maxAdContentRating: MaxAdContentRating.PG,
//                 tagForChildDirectedTreatment: true,
//                 tagForUnderAgeOfConsent: true,
//             })
//         return () => {
//             eventListener();
//         };
//     }, []);
//
//     return { interstitial }
// }
//
// export const useAdRewarded = () => {
//     const adUnitIdREWARDED = 'ca-app-pub-3940256099942544/5224354917';
//     const rewarded = RewardedAd.createForAdRequest(adUnitIdREWARDED);
//     useEffect(() => {
//         const eventListener = rewarded.onAdEvent((type, error, reward) => {
//             if (type === AdEventType.LOADED) {
//                 rewarded.show().then( e => {
//                     console.log("LOADED", e)
//                 });
//             }
//             console.log("reward: ",reward)
//         });
//
//         admob()
//             .setRequestConfiguration({
//                 // Update all future requests suitable for parental guidance
//                 maxAdContentRating: MaxAdContentRating.PG,
//
//                 // Indicates that you want your content treated as child-directed for purposes of COPPA.
//                 tagForChildDirectedTreatment: true,
//
//                 // Indicates that you want the ad request to be handled in a
//                 // manner suitable for users under the age of consent.
//                 tagForUnderAgeOfConsent: true,
//             })
//         return () => {
//             eventListener();
//         };
//     }, []);
//
//     return { rewarded }
// }
