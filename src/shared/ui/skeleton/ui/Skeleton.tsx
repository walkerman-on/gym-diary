import { Skeleton as MUISkeleton } from '@mui/material';
import { FC, memo } from 'react';
import { ISkeletonProps } from './IProps';

interface ISkeletonPropsExtended extends ISkeletonProps {
  count?: number;
}

const SkeletonF: FC<ISkeletonPropsExtended> = (props) => {
  const { height, width, count = 1 } = props;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <MUISkeleton
          key={index}
          height={height}
          width={width}
          sx={{
            background: "var(--color-primary-400)",
            borderRadius: "9px",
            marginBottom: '-10px',
            marginTop: "-10px",
            width: "100%"
          }}
        />
      ))}
    </>
  );
};

export const Skeleton = memo(SkeletonF);
