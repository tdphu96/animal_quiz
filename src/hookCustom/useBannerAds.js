import React from "react";
import {BannerAd, BannerAdSize, TestIds} from "@react-native-firebase/admob";

const codeBanner = "ca-app-pub-8956847995269096/6155274845"
const useBannerAds = () => {
    const AdBanner = ({ unitId=codeBanner }) => {
        const adUnitId = unitId ? unitId : TestIds.BANNER;
        return (
            <BannerAd
                unitId={codeBanner}
                size={BannerAdSize.SMART_BANNER}
                // requestOptions={{
                //     requestNonPersonalizedAdsOnly: false,
                // }}
            />
        );
    }
    return AdBanner
}

export default useBannerAds
