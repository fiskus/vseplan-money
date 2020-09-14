import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';

import Expander from '../Expander';
import RootStore from '../../store/root';
import useStore from '../../hooks/store';
import { PATH_INDEX } from '../../router/paths';

import * as Container from './style';

const Header: FunctionComponent = () => {
  const { store } = useStore<'store', RootStore>();

  return (
    <Container.Container>
      <Container.LogoWrapper>
        <Container.Logo to={PATH_INDEX()}>
          vseplan
        </Container.Logo>
      </Container.LogoWrapper>
      <Container.Expander>
        <Expander
          isExpanded={store.areIncomesExpanded}
          onClick={(): void => store.expandIncomes(!store.areIncomesExpanded)}
        />
      </Container.Expander>
    </Container.Container>
  );
};

export default observer(Header);
