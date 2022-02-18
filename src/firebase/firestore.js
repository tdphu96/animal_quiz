import firestore from '@react-native-firebase/firestore';

const FIRESTORE = {}
FIRESTORE.TIMESTAMP_SERVER = () => firestore.Timestamp.now().toMillis()
FIRESTORE.CREATE_BATCH = () => firestore().batch()
FIRESTORE.arrayUnion = (e) => firestore.FieldValue.arrayUnion(e)
FIRESTORE.arrayRemove = (e) => firestore.FieldValue.arrayRemove(e)

FIRESTORE.usersRef = firestore().collection('users')

const USER = {};

USER.obj = (obj) => {
    let { name, level, money } = obj;
    name = name || ''
    level = level || 0
    money = money || 0
    money = money || 0
    return { name, level, money }
}

USER.validate = (obj) => {
    const { name, level, money } = USER.obj(obj);
    if (!name) return false
    if (!typeof level === 'number') return false
    if (!typeof money === 'number') return false
    return true
}

USER.add = async (data) => {
    try {
        const { name, level, money } = data
        await FIRESTORE.usersRef.add({ name, level, money })
    } catch (e) {
        console.log(e)
    }
}

USER.update = async (key, data) => {
    try {
        await FIRESTORE.usersRef.doc(key).set(data)
    } catch (e) {
        console.log(e)
    }
}

USER.delete = async (id) => {
    try {
        await FIRESTORE.usersRef.doc(id).delete()
    } catch (e) {
        console.log(e)
    }
}

import {useEffect, useState} from "react";
USER.useUsers = () => {
    const [ data, setData ] = useState([])
    useEffect(() => {
        const subscriber = FIRESTORE.usersRef
            .orderBy('level', 'desc')
            .limit(100)
            .onSnapshot(querySnapshot => {
                if (!querySnapshot || !querySnapshot.docs.length) return setData([])
                const temp = querySnapshot.docs.map(documentSnapshot => ({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                }));
                setData(temp);
            });

        return () => subscriber();
    }, []);
    return data
}

FIRESTORE.USER = USER

export default FIRESTORE
