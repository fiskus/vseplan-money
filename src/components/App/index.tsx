import 'normalize.css';
import '../../assets/main.css';

import React, { ReactElement } from 'react';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';

import 'mobx-react-lite/batchingForReactDom';

import Router from '../Router';
import RootStore from '../../store/root';
import theme from '../../theme/light';

import * as Container from './style';

const store = new RootStore();

export default (): ReactElement => (
  <ThemeProvider theme={theme}>
    <Container.Wrapper>
      <Provider store={store}>
        <Router />
      </Provider>
    </Container.Wrapper>
  </ThemeProvider>
);
