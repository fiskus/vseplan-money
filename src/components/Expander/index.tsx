import React, { FunctionComponent, ReactElement } from 'react';

import Icon from '../Icon';

import * as Container from './style';

type ExpanderProps = {
  isExpanded: boolean;
  onClick: () => void;
  children?: ReactElement;
};

const ChevronUpIcon = (): ReactElement => <Icon name="chevron-up" size={32} />;

const ChevronDownIcon = (): ReactElement => <Icon name="chevron-down" size={32} />;

const Expander: FunctionComponent<ExpanderProps> = (props: ExpanderProps) => {
  const { isExpanded, onClick } = props;

  return (
    <Container.Wrapper onClick={onClick}>
      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon /> }
    </Container.Wrapper>
  );
};

export default Expander;
