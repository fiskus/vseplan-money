import React, { FC, ReactElement, ReactNode } from 'react';

import * as Container from './style';

type ButtonLoginProps = {
  children: ReactNode;
  url: string;
};

const ButtonLogin: FC<ButtonLoginProps> = (props: ButtonLoginProps): ReactElement<void> => {
  const { children, url } = props;

  return (
    <Container.Container>
      <Container.Link href={url}>{children}</Container.Link>
    </Container.Container>
  );
};

export default ButtonLogin;
