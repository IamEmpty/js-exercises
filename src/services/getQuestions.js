// @flow
import floatToInteger from './floatToInteger';
import database from './fireStoreService';
import { signIn, onRegister } from './authService';

function getDocument(id: string, collection: string) {
  return database.collection(collection).doc(id).get();
}

function getRandomId(collection) {
  const documentsIds = [];
  return database.collection(collection).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        documentsIds.push(doc.id);
      });
    })
    .then(() => {
      const { length } = documentsIds;
      const random = floatToInteger(length - 1, Math.random());
      return documentsIds[random];
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}

async function getRandomDocument(collection: string) {
  const id = await getRandomId(collection);
  return getDocument(id, collection);
}

export {
  getDocument as default,
  getRandomDocument,
};
