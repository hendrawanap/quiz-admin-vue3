import {
  browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import initFirebase from './firebase';

initFirebase();

const initAuth = async () => {
  const auth = getAuth();
  await setPersistence(auth, browserLocalPersistence);

  const signInWithEmail = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user.getIdToken();
  };
  const logout = () => signOut(auth);
  const getCurentUserIdToken = () => auth.currentUser.getIdToken();

  return {
    signInWithEmail,
    logout,
    getCurentUserIdToken,
  };
};

export default initAuth;
