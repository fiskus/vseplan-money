import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
  transition: ease box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);
  }
`;

export const Link = styled.a`
  display: block;
  text-decoration: none;
  line-height: 32px;
  padding: 0 32px;
`;
