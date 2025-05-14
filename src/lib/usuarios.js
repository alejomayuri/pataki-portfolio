import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export const isUsernameAvailable = async (username) => {
  const docRef = doc(db, "usernames", username);
  const docSnap = await getDoc(docRef);
  return !docSnap.exists();
};

export const saveUsernameForUser = async (uid, newUsername) => {
  const userRef = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const currentData = userSnap.data();
    const oldUsername = currentData.username;

    // Borra el username anterior si existe
    if (oldUsername && oldUsername !== newUsername) {
      await deleteDoc(doc(db, "usernames", oldUsername));
    }
  }

  // Actualiza el username y añade el menú dentro de portfolio
  await setDoc(
    userRef,
    {
      username: newUsername,
      portfolio: {
        menuLinks: [
          {
            title: "Sobre mí",
            link: `/${newUsername}`,
          },
        ],
      },
    },
    { merge: true }
  );

  // Crea nuevo documento en /usernames con el nuevo username
  await setDoc(doc(db, "usernames", newUsername), { uid });
};

