import { Skeleton as MUISkeleton } from '@mui/material';
import { FC, memo } from 'react';
import { ISkeletonProps } from './IProps';

const SkeletonF: FC<ISkeletonProps> = (props) => {
  return (
    <MUISkeleton height={props.height} width={props.width}
      sx={{
        background: "var(--color-primary-400)",
        padding: '0',
        margin: "0",
        borderRadius: "12px"
      }} />
  );
};

export const Skeleton = memo(SkeletonF);
