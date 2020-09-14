import React, { FunctionComponent, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react';

import FormExport from '../components/FormExport';

const ExportIndex: FunctionComponent<RouteComponentProps> = (): ReactElement<void> => (
  <div>
    <FormExport />
  </div>
);

export default observer(ExportIndex);
