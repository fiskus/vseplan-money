import React, { FunctionComponent, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react';

import FormLogin from '../components/FormLogin';

const LoginIndex: FunctionComponent<RouteComponentProps> = (): ReactElement<void> => (
  <div>
    <FormLogin />
  </div>
);

export default observer(LoginIndex);
