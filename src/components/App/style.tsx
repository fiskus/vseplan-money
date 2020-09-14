/* eslint import/prefer-default-export: 0 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${(props): string => props.theme.body.background};
  min-height: 100%;
  overflow: hidden;
`;
