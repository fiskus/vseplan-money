import React, { FC, ReactElement, Suspense } from 'react';
import { RouteComponentProps } from '@reach/router';

const Fallback: FC = () => (<div>Loading…</div>);

type PageSuspendedProps = RouteComponentProps & {
  children: ReactElement;
};

const PageSuspended: FC<PageSuspendedProps> = (props: PageSuspendedProps): ReactElement => {
  const { children } = props;

  return (
    <Suspense fallback={<Fallback />}>
      {children}
    </Suspense>
  );
};

export default PageSuspended;
