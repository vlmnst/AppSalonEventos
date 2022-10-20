import { useContext } from 'react';
import AuthContext from '../context/AuthPovider';

function useAuth() {
  return useContext(AuthContext)
}

export default useAuth