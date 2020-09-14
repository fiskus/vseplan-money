import styled from 'styled-components';

import { media } from '../../theme/viewport';

export const Wrapper = styled.div`
  background: ${(props): string => props.theme.layout.background};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  max-width: 1280px;

  ${media.greaterThan('mobile')`
    margin: auto;
  `}

  ${media.greaterThan('wide')`
    margin: 24px auto;
  `}
`;

export const Inner = styled.div`
  padding: 8px;

  ${media.greaterThan('mobile')`
    padding: 24px;
  `}
`;

export const Header = styled.div`
  border-bottom: 1px solid ${(props): string => props.theme.layout.border};
`;
