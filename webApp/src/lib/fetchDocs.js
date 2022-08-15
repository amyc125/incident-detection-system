import firebase from './firebase';

//refactor name to fetchDocs 
export const fetchDocs = async (collection) => {
  let docs = []
  const eventCollectionDocs = firebase.firestore().collection(collection);
  const snapshot = await eventCollectionDocs.get();

  let data = {}
  snapshot.forEach(doc => { 
    // console.log(doc.id, '=>', doc.data())

    data = doc.data()
    data.id = doc.id

    docs.push(data)
  });
  console.log(docs)
  return docs
};