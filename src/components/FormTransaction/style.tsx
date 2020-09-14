import styled from 'styled-components';

export const Container = styled.form`
`;

export const Header = styled.div`
  align-items: center;
  color: ${(props): string => props.theme.category.foreground};
  display: flex;
  font: 500 24px Roboto, Helvetica, Arial, sans-serif;
  justify-content: space-between;
  margin: 0 0 32px;
`;

export const Label = styled.span`
  font-size: 32px;
`;

export const Name = styled.span`
  font-weight: 600;
`;

export const Input = styled.input`
  border: 1px solid ${(props): string => props.theme.form.input.border};
  border-radius: 4px;
  display: block;
  font: 500 16px/32px Roboto, Helvetica, Arial, sans-serif;
  margin: 0 0 32px;
  padding: 0 8px;
`;

export const Submit = styled.button`
  border: 1px solid ${(props): string => props.theme.form.input.border};
  border-radius: 4px;
  font: 500 16px/32px Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0 24px;
`;
