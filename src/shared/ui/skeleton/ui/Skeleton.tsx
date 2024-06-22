import { Skeleton as MUISkeleton } from '@mui/material';
import { FC, memo } from 'react';
import { ISkeletonProps } from './IProps';

const SkeletonF: FC<ISkeletonProps> = (props) => {
  return (
    <MUISkeleton height={props.height} width={props.width}
      sx={{
        padding: '0',
        margin: "0"
      }} />
  );
};

export const Skeleton = memo(SkeletonF);
