import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { setUser } from '../model/slice/userSlice';
import { IUseLoginReturn } from './types';
import { getDate, getWorkout } from 'app/providers/router/config/routes';

export const useLogin = (): IUseLoginReturn => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          }),
        );
        navigate(getDate());
      })
      .catch(() => alert('Введены некорректные данные!'));
  };

  return { login: handleLogin };
};
