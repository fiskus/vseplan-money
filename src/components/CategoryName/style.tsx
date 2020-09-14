import styled, { keyframes } from 'styled-components';
import { Link as L } from '@reach/router';

export const Wrapper = styled.div`
  margin: 0 0 8px;
  position: relative;
`;

export const Title = styled.span`
  display: block;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const Link = styled(L)`
  color: ${(props): string => props.theme.category.foreground};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const showTooltip = keyframes`
  from {
    transform: translate(-50%, 14px);
    opacity: 0.3;
  }

  to {
    transform: translate(-50%, 24px);
    opacity: 1;
  }
`;

export const Tooltip = styled.div`
  animation: ${showTooltip} .15s ease-out;
  background: ${(props): string => props.theme.layout.background};
  border-radius: 4px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
  left: 50%;
  padding: 4px 8px 2px;
  position: absolute;
  top: 0;
  transform: translate(-50%, 24px);
  z-index: 10;
`;
