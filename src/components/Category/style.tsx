import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  color: ${(props): string => props.theme.category.foreground};
  display: flex;
  flex-direction: column;
  font: 500 14px Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: ${(props): string => props.theme.category.wrapper.width};
`;

export const Icon = styled.div`
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
  cursor: grab;
  display: flex;
  font-size: 32px;
  height: ${(props): string => props.theme.category.width};
  justify-content: center;
  transition: box-shadow 0.3s ease;
  width: ${(props): string => props.theme.category.width};

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
`;

export const Name = styled.span`
  max-width: ${(props): string => props.theme.category.wrapper.width};
`;

export const Amount = styled.div`
  margin: 8px 0 0;
`;
