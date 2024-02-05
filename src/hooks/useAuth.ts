import { useContext } from 'react';
import AuthContext from 'src/contexts/JWTAuthContext';
import FirebaseContext from 'src/contexts/FirebaseAuthContext';

const useAuth = () => useContext(AuthContext);
export const useAuthFirebase = () => useContext(FirebaseContext);

export default useAuth;
