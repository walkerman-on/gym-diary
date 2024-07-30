import { AppDispatch } from 'app/providers/store-provider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
