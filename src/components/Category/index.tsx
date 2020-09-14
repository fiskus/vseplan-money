import React, { ReactElement, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

import CategoryAmount from '../CategoryAmount';
import CategoryName from '../CategoryName';
import Icon from '../Icon';
import {
  Category,
  DbDocument,
  TransactionDrag,
  UnitType,
} from '../../types';

import * as Container from './style';

type CategoryProps = {
  color: string;
  moneyUnit: DbDocument<Category>;
  onChange?: (source: DbDocument<Category>, target: DbDocument<Category>) => void;
  onEdit: () => void;
  onRemove: () => void;
  sourceType?: UnitType;
};

export default (props: CategoryProps): ReactElement => {
  const {
    color,
    moneyUnit,
    onChange,
    sourceType,
    /* onEdit,
     * onRemove, */
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dragRef] = useDrag<TransactionDrag, void, void>({
    item: {
      type: moneyUnit.unitType,
      unit: moneyUnit,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isActive }, dropRef] = useDrop<TransactionDrag, void, { isActive: boolean }>({
    accept: sourceType || '',
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    drop: onChange
      ? ({ unit }): void => onChange(unit, moneyUnit)
      : (): null => null,
  });

  const theme = useContext(ThemeContext);
  const iconStyle = {
    backgroundColor: isActive ? theme.category.backgroundHover : color,
    color: theme.category.icon.foreground,
  };

  return (
    <Container.Wrapper ref={dropRef}>
      <Container.Name>
        <CategoryName moneyUnit={moneyUnit} />
      </Container.Name>

      <Container.Icon ref={dragRef} style={iconStyle}>
        { !isActive
          ? (
            <Icon
              name={moneyUnit.icon.content}
              size={40}
            />
          ) : null }
      </Container.Icon>

      <Container.Amount>
        <CategoryAmount amount={moneyUnit.amount} />
      </Container.Amount>
    </Container.Wrapper>
  );
};
