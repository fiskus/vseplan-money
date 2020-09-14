import styled from 'styled-components';
import { UnitType } from '../../types/index';

export const Wrapper = styled.div`
  border-bottom: 1px solid ${(props): string => props.theme.layout.border};
  margin: 0 0 16px;
  overflow: auto;

  &:last-child {
    border-bottom: 0;
  }
`;

type InnerProps = {
  sourceType?: UnitType;
};

export const Inner = styled.div<InnerProps>`
  ${(props): string => ((props.sourceType === UnitType.Wallet)
    ? `
      display: grid;
      grid-gap: 2px;
      grid-row-gap: 16px;
      grid-template-columns: repeat(auto-fill, ${props.theme.category.wrapper.width});
`
    : `
      display: flex;
      flex-wrap: nowrap;
    `)}

  padding: 0 0 16px;
`;

export const Category = styled.div`
  margin: 0 2px 0 0;
`;
