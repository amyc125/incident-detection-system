import firebase from './firebase';

export const countCollectionDocs = async (collection) => {
    let count = 0
    const query = firebase.firestore().collection(collection);
    const snapshot = await query.get();
    snapshot.forEach(doc => { 
   //   console.log(doc.id, '=>', doc.data());
      count = count + 1
    });
    return count
};