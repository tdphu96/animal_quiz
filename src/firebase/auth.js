import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useEffect, useState} from "react";
import FIRESTORE from "./firestore";

const AUTH = {}


// AUTH.loginFacebook = async () => {
//     try {
//
//         // Attempt login with permissions
//         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//         if (result.isCancelled) {
//             throw 'User cancelled the login process';
//         }
//
//         // Once signed in, get the users AccesToken
//         const data = await AccessToken.getCurrentAccessToken();
//
//         if (!data) {
//             throw 'Something went wrong obtaining access token';
//         }
//
//         // Create a Firebase credential with the AccessToken
//         const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//
//         // Sign-in the user with the credential
//         return auth().signInWithCredential(facebookCredential);
//     } catch (e) {
//         console.log(e)
//     }
// }

GoogleSignin.configure({ webClientId: "339820071138-tjp8r1g5j6gjjsodkvif1iha8e46hsoq.apps.googleusercontent.com" });
AUTH.loginGoogle = async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (e) {
        console.log(e)
    }
}

AUTH.useUserCurrent = () => {
    const [user, setUser] = useState(null);
    function onAuthStateChanged(user) {
        try {
            setUser(user)
        } catch (e) {
            setUser(null)
            console.log(e)
        }
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => {subscriber()};
    }, []);

    return user
}

// AUTH.update = async (value) => {
//     await auth().currentUser.updateProfile({
//         displayName: value
//     })
// }

AUTH.updateProfile = (profile) => auth().currentUser.updateProfile(profile)

AUTH.updateLevelMoney = async (profile) => {
    if (!auth().currentUser) return console.log("no login");
    const space = '=='
    const r = auth().currentUser.displayName.split(space);
    let temp = null;
    let name = '';
    if (r.length === 1) {
        name = r[0];
        temp = profile.level + space + profile.money + space + r[0]
    }
    if (r.length === 3) {
        name = r[2];
        temp = profile.level + space + profile.money + space + r[2]
    }
    if (temp) {
        await auth().currentUser.updateProfile({
            displayName: temp
        })

        console.log("save rank: ", {
            ...profile, name
        })
        console.log(auth().currentUser)
        let { photoURL, uid } = auth().currentUser
        photoURL += '?height=500&type=square'
        await FIRESTORE.USER.update(uid, {
            ...profile, name, photoURL
        })
    }
}

AUTH.isLogin = () => {
    try {
        let r = false
        if (auth().currentUser) r = true
        return r
    } catch (e) {
        return false
        console.log(e)
    }
}


AUTH.logout = () => auth().signOut()
export default AUTH
