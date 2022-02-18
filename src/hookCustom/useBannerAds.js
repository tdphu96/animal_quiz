import React from "react";
import {BannerAd, BannerAdSize, TestIds} from "@react-native-firebase/admob";

const codeBanner = "ca-app-pub-8956847995269096/8784974477"
const useBannerAds = () => {
    const AdBanner = ({ unitId=codeBanner }) => {
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
    return AdBanner
}

export default useBannerAds
