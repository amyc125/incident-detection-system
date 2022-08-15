import firebase from './firebase';

export const deleteCollectionDoc = async (collection, doc) => {
    await firebase.firestore().collection(collection).doc(doc).delete();
    return 0
};