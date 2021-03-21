import { Button } from '@chakra-ui/button';
import React, { memo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;

  onClick?: () => void;
}

export const PrimaryButton: React.VFC<Props> = memo(({ children, disabled, loading, onClick }) => {
  return (
    <Button
      bg="bblue.600"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
