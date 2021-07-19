import React, { useRef, useState, useEffect } from 'react';

import { Button } from '.';
import { ButtonProps } from './Button';
import { Loading } from '../Loading';

type LoadingButtonProps = ButtonProps & {
  onClick: () => Promise<any>;
};

export const ButtonWithLoader: React.FC<LoadingButtonProps> = ({ onClick, ...props }) => {
  const [isLoading, toggleLoadingState] = useState(false);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current?.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, [props.children]);

  const showLoader = useMinimalDelay(isLoading, 400);

  const handleClick = () => {
    toggleLoadingState(true);
    onClick().finally(() => {
      toggleLoadingState(false);
    });
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      isDisable={showLoader}
      Icon={showLoader ? undefined : props.Icon}
      ref={ref}
      style={width ? { minWidth: width } : {}}
    >
      {showLoader ? <Loading size={25} /> : props.children}
    </Button>
  );
};

const useMinimalDelay = (isLoading: boolean, minDelay: number) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const startRef = useRef(0);

  useEffect(() => {
    if (isLoading && !showLoader) {
      startRef.current = new Date().getTime();
      setShowLoader(true);
    }

    if (!isLoading && showLoader) {
      const timeDiff = new Date().getTime() - startRef.current;

      const timeout = setTimeout(
        () => {
          setShowLoader(false);
        },
        timeDiff < minDelay ? minDelay - timeDiff : 0
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, showLoader]);

  return showLoader;
};
