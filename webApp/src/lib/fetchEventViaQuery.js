import firebase from './firebase';

export const fetchEventViaQuery = async (collection, attribute, inputValue) => {
  let docs = []
  const query = firebase.firestore().collection(collection).where(attribute, '==', inputValue);
  const snapshot = await query.get();
  let data = {}
  snapshot.forEach(doc => { 
    data = doc.data()
    data.id = doc.id

    docs.push(data)
  });
  return docs
};