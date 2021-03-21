import { Button } from '@chakra-ui/button';
import React, { memo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export const PrimaryButton: React.VFC<Props> = memo(({ children, onClick }) => {
  return (
    <Button bg="bblue.600" color="white" _hover={{ opacity: 0.8 }} onClick={onClick}>
      {children}
    </Button>
  );
});
