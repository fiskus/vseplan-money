import React, { FC, ReactElement, lazy } from 'react';
import { RouteComponentProps, Router, navigate } from '@reach/router';

import PageSuspended from '../PageSuspense';
import { getJwt } from '../../xhr/jwt';
import {
  PATH_CATEGORY,
  PATH_EXPORT,
  PATH_INDEX,
  PATH_LOGIN,
  PATH_TRANSACTION,
} from '../../router/paths';

const PageCategory = lazy(() => import('../../pages/category'));
const PageExport = lazy(() => import('../../pages/export'));
const PageIndex = lazy(() => import('../../pages/index'));
const PageLogin = lazy(() => import('../../pages/login'));
const PageTransaction = lazy(() => import('../../pages/transaction'));

type PageCategorySuspendedProps = {
  categoryId: string;
};
const PageCategorySuspended: FC<RouteComponentProps<PageCategorySuspendedProps>> = (
  props: PageCategorySuspendedProps,
) => {
  const { categoryId } = props;

  return (
    <PageSuspended>
      <PageCategory categoryId={categoryId || ''} />
    </PageSuspended>
  );
};

const PageExportSuspended: FC<RouteComponentProps> = () => (
  <PageSuspended>
    <PageExport />
  </PageSuspended>
);

const PageIndexSuspended: FC<RouteComponentProps> = () => (
  <PageSuspended>
    <PageIndex />
  </PageSuspended>
);

const PageLoginSuspended: FC<RouteComponentProps> = () => (
  <PageSuspended>
    <PageLogin />
  </PageSuspended>
);

const PageTransactionSuspended: FC<RouteComponentProps> = () => (
  <PageSuspended>
    <PageTransaction />
  </PageSuspended>
);

const jwt = getJwt();

export default (): ReactElement => {
  if (!jwt) {
    navigate(PATH_LOGIN());
  }

  return (
    <Router>
      <PageCategorySuspended path={PATH_CATEGORY()} />
      <PageExportSuspended path={PATH_EXPORT()} />
      <PageIndexSuspended path={PATH_INDEX()} />
      <PageLoginSuspended path={PATH_LOGIN()} />
      <PageTransactionSuspended path={PATH_TRANSACTION()} />
    </Router>
  );
};
