import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { setUser } from '../model/slice/userSlice';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getUserSelector } from '../model/selectors/userSelector';
import { useNavigate } from 'react-router-dom';
import { getLogin } from 'app/providers/router/config/routes';
import { User } from '../model/types/user';

export interface IUseAuthReturn {
  isAuth: boolean;
  user: User | null;
}

export const useAuth = (): IUseAuthReturn => {
  const { isAuthorized, user } = useAppSelector(getUserSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        // Перенаправление только если пользователь не авторизован
        if (isAuthorized) {
          navigate(getLogin());
        }
      }
    });

    return () => unsubscribe(); // Очистка слушателя при размонтировании
  }, [dispatch, navigate, isAuthorized]);

  return {
    isAuth: isAuthorized,
    user,
  };
};
