import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 26px 0;
  text-align: center;
  margin: 0 2px 0 0;
  width: ${(props): string => props.theme.category.wrapper.width};
`;

export const Icon = styled.div`
  color: ${(props): string => props.theme.category.background};
  cursor: pointer;

  &:hover {
    color: ${(props): string => props.theme.category.backgroundHover};
  }
`;
