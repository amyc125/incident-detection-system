import firebase from './firebase';

export const fetchEventLog = async (collection, doc_id) => {
    let doc = {} 
    await firebase.firestore().collection(collection).doc(doc_id).get().then((snapshot) => {
      doc = snapshot.data()
      console.log(doc.id, '=>', doc.data())
    }).catch((e) => console.log(e)) 
    
    return doc; 
};

// async function, waits for request to complete -> research async/await JS functions 
