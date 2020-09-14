import styled from 'styled-components';

export const Container = styled.div`
`;

export const NameWrapper = styled.div`
`;

export const AmountWrapper = NameWrapper;

export const Name = styled.div`
  color: ${(props): string => props.theme.category.foreground};
  font: 500 24px Roboto, Helvetica, Arial, sans-serif;
`;

export const Amount = Name;

export const NameForm = styled.form`
  display: flex;
  margin: 0 0 32px;
`;

export const AmountForm = NameForm;

export const NameInput = styled.input`
  border: 1px solid ${(props): string => props.theme.form.input.border};
  border-radius: 4px;
  display: block;
  font: 500 16px/32px Roboto, Helvetica, Arial, sans-serif;
  padding: 0 8px;
`;

export const AmountInput = NameInput;

export const NameEdit = styled.div`
  color: ${(props): string => props.theme.category.background};
  margin: 0 0 0 24px;
  cursor: pointer;

  &:hover {
    color: ${(props): string => props.theme.category.backgroundHover};
  }
`;
export const AmountEdit = NameEdit;

export const NameSubmit = styled.button`
  color: ${(props): string => props.theme.category.background};
  margin: 0 0 0 24px;
  cursor: pointer;
  padding: 0;
  border: 0;
  background: ${(props): string => props.theme.layout.background};

  &:hover {
    color: ${(props): string => props.theme.category.backgroundHover};
  }
`;
export const AmountSubmit = NameSubmit;
