import styled from 'styled-components';
import { Link as L } from '@reach/router';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr ${(props): string => props.theme.category.width};
  height: ${(props): string => props.theme.category.width};
`;

export const Expander = styled.div`
  border-left: 1px solid ${(props): string => props.theme.layout.border};
  margin: 0 0 0 auto;
`;

export const LogoWrapper = styled.div`
  padding: 0 24px;
`;

export const Logo = styled(L)`
  color: #fff;
  font: 900 24px/${(props): string => props.theme.category.width} Roboto,Helvetica,Arial,sans-serif;
  text-decoration: none;
  text-shadow: 0 0 4px rgba(0,0,0,0.3);

  &:hover {
    text-shadow: 0 0 2px rgba(0,0,0,0.3);
  }
`;
