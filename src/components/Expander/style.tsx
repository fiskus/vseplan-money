/* eslint import/prefer-default-export: 0 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: ${(props): string => props.theme.category.width};
  justify-content: center;
  width: ${(props): string => props.theme.category.width};
`;
