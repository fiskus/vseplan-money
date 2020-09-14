import React, { ReactElement, useState } from 'react';

import { Category, DbDocument } from '../../types';
import { PATH_CATEGORY } from '../../router/paths';

import * as Container from './style';

type CategoryNameProps = {
  moneyUnit: DbDocument<Category>;
};

export default (props: CategoryNameProps): ReactElement => {
  const { moneyUnit } = props;

  const [isExpanded, shouldExpand] = useState(false);
  // eslint-disable-next-line no-underscore-dangle
  const url = PATH_CATEGORY(moneyUnit.id._id);

  return (
    <Container.Wrapper>
      <Container.Title
        onMouseOver={(): void => shouldExpand(true)}
        onMouseOut={(): void => shouldExpand(false)}
      >
        <Container.Link to={url}>
          {moneyUnit.name}
        </Container.Link>
      </Container.Title>

      { (isExpanded && moneyUnit.name.length > 8)
        ? <Container.Tooltip>{moneyUnit.name}</Container.Tooltip>
        : null }
    </Container.Wrapper>
  );
};
