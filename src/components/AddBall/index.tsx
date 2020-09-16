import React, { FunctionComponent } from 'react';

import Icon from '../Icon';

import * as Container from './style';

type AddBallProps = {
  onClick: () => void;
  title: string;
};

const AddBall: FunctionComponent<AddBallProps> = (props: AddBallProps) => {
  const { onClick, title } = props;

  return (
    <Container.Wrapper title={title}>
      <Container.Icon onClick={onClick}>
        <Icon
          size={64}
          name="plus-circle"
        />
      </Container.Icon>
    </Container.Wrapper>
  );
};

export default AddBall;
