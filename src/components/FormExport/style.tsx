/* eslint import/prefer-default-export: 0 */

import styled from 'styled-components';

export const Container = styled.form`
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
  margin: 50px auto;
  transition: ease box-shadow 0.3s;
  width: 300px;

  &:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);
  }
`;
