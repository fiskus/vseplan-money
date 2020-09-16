import React, { ReactElement } from 'react';

import AddBall from '../AddBall';
import CategoryBall from '../Category';
import {
  Category,
  DbDocument,
  CategoryNormalized,
  UnitType,
} from '../../types/index';

import * as Container from './style';

type CategoryListProps = {
  addTitle: string;
  color: string;
  moneyUnits: CategoryNormalized;
  onAdd: () => void;
  onChange?: (source: DbDocument<Category>, target: DbDocument<Category>) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  sourceType?: UnitType;
};

export default (props: CategoryListProps): ReactElement<CategoryListProps> => {
  const {
    addTitle,
    color,
    moneyUnits,
    onAdd,
    onChange,
    onEdit,
    onRemove,
    sourceType,
  } = props;

  return (
    <Container.Wrapper>
      <Container.Inner sourceType={sourceType}>
        {moneyUnits.order.map((id) => (
          <Container.Category key={id}>
            <CategoryBall
              color={color}
              moneyUnit={moneyUnits.dict[id]}
              onChange={onChange}
              onEdit={(): void => onEdit(id)}
              onRemove={(): void => onRemove(id)}
              sourceType={sourceType}
            />
          </Container.Category>
        ))}

        <AddBall onClick={onAdd} title={addTitle} />
      </Container.Inner>
    </Container.Wrapper>
  );
};
