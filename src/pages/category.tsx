import React, { FC, ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react';

import FormCategory from '../components/FormCategory';
import Layout from '../components/Layout';
import RootStore from '../store/root';
import useStore from '../hooks/store';

type PageCategoryProps = {
  categoryId: string;
};

const PageCategory: FC<PageCategoryProps> = (props: PageCategoryProps): ReactElement<void> => {
  const { categoryId } = props;

  const { store } = useStore<'store', RootStore>();

  useEffect(() => {
    store.load();
  });

  const category = store.getCategory(categoryId);

  return (
    <Layout>
      { category
        ? (
          <FormCategory
            category={category}
            onValueChange={(value): void => store.editValue(category, value)}
          />
        ) : null }
    </Layout>
  );
};

export default observer(PageCategory);
