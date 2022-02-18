import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import AUTH from "../firebase/auth";
import FIRESTORE from "../firebase/firestore";

import {setProfile} from "../redux/reducers/profileReducer";
const useAsyncProfileFirebase = ({ key }) => {
    const dispatch = useDispatch()
    const profile = useSelector( state => state.profile )
    const keys = Object.keys(profile);
    const user = AUTH.useUserCurrent();
    useEffect(() => {
        if (!user) return;
        const space = '=='
        const displayName = user.displayName
        console.log("displayName",displayName)
        const r = displayName.split(space);
        console.log("displayName",r, keys)
        if (r.length <=1) return;
        let d = {};
        keys.forEach( (e, i) => d[e] = parseInt(r[i]))
        let update = d[key] > profile[key] ? d : profile
        dispatch(setProfile(update))
    }, [user ]);


    useEffect(() => {
        if (!user) return ;
        const space = '=='
        const displayName = user.displayName
        const r = displayName.split(space);
        let temp = null;
        let name = '';
        if (r.length === 1) {
            name = displayName;
            temp = keys.map( (e) => profile[e]).join(space) + space + displayName
        } else {
            name = r[r.length-1];
            temp = keys.map( (e) => profile[e]).join(space) + space + name
        }
         if (temp) {
            AUTH.updateProfile({
                displayName: temp
            }).then(() =>
                console.log("updateProfile: ", {
                    ...profile, name
                })
            )

            let { photoURL, uid } = user
            photoURL += '?height=500&type=square'
            FIRESTORE.USER.update(uid, {
                ...profile, name, photoURL
            }).then(() =>
                console.log("save rank: ", {
                    ...profile, name
                })
            )
        }
    }, [ profile, user ]);

    return user
}

export default useAsyncProfileFirebase
