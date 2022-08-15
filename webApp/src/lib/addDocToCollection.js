import firebase from './firebase';

export const addDocToCollection = async (collection, data) => {
    const res = await firebase.firestore().collection(collection).add(data);
    if(res.id) {
        console.log(res);
        return "ok";
    } else {
        return "error";
    }
}
