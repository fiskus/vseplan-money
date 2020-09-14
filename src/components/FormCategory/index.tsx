import React, {
  FC,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { observer } from 'mobx-react';

/* import RootStore from '../../store/root';
 * import useStore from '../../hooks/store'; */
import { Category } from '../../types';
import Icon from '../Icon';

import * as Container from './style';

type CategoryFormProps = {
  category: Category;
  onValueChange: (value: number) => void;
};

const CategoryForm: FC<CategoryFormProps> = (props: CategoryFormProps): ReactElement<void> => {
  const { category, onValueChange } = props;

  const [isNameEditing, editName] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const [isAmountEditing, editAmount] = useState(false);
  const [categoryAmount, setCategoryAmount] = useState(category.amount.value);

  const onValueChangeInternal = useCallback((event) => {
    const value = Number(event.target.value);
    setCategoryAmount(value);
  }, [setCategoryAmount]);

  const onSubmitAmount = (event: FormEvent): void => {
    event.preventDefault();

    editAmount(false);
    onValueChange(categoryAmount);
  };

  const onSubmitName = (event: FormEvent): void => {
    event.preventDefault();
    editName(false);
  };

  return (
    <Container.Container>
      <Container.NameWrapper>
        { isNameEditing
          ? (
            <Container.NameForm onSubmit={onSubmitName}>
              <Container.NameInput
                onChange={(event): void => setCategoryName(event.target.value)}
                value={categoryName}
              />
              <Container.NameSubmit>
                <Icon name="save" size={24} />
              </Container.NameSubmit>
            </Container.NameForm>
          )
          : (
            <Container.NameForm>
              <Container.Name>
                {categoryName}
              </Container.Name>
              <Container.NameEdit onClick={(): void => editName(true)}>
                <Icon name="edit" size={24} />
              </Container.NameEdit>
            </Container.NameForm>
          ) }
      </Container.NameWrapper>

      <Container.AmountWrapper>
        { isAmountEditing
          ? (
            <Container.AmountForm onSubmit={onSubmitAmount}>
              <Container.AmountInput
                onChange={onValueChangeInternal}
                type="number"
                value={categoryAmount}
              />
              <Container.AmountSubmit>
                <Icon name="save" size={24} />
              </Container.AmountSubmit>
            </Container.AmountForm>
          )
          : (
            <Container.AmountForm>
              <Container.Amount>
                {categoryAmount}
              </Container.Amount>
              <Container.AmountEdit onClick={(): void => editAmount(true)}>
                <Icon name="edit" size={24} />
              </Container.AmountEdit>
            </Container.AmountForm>
          ) }
      </Container.AmountWrapper>
    </Container.Container>
  );
};

export default observer(CategoryForm);
