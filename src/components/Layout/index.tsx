import React, { FunctionComponent, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useWindowWidth } from '@react-hook/window-size';

import Header from '../Header';
import { MOBILE } from '../../theme/viewport';

import * as Container from './style';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  const width = useWindowWidth();

  const backend = width < MOBILE ? TouchBackend : HTML5Backend;

  return (
    <Container.Wrapper>
      <Container.Header>
        <Header />
      </Container.Header>

      <DndProvider backend={backend}>
        <Container.Inner>
          {children}
        </Container.Inner>
      </DndProvider>
    </Container.Wrapper>
  );
};

export default Layout;
