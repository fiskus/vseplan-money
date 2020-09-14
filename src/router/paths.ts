export const PATH_CATEGORY = (id?: string): string => (id ? `category/${id}` : 'category/:categoryId');

export const PATH_EXPORT = (): string => 'export';

export const PATH_INDEX = (): string => '/';

export const PATH_LOGIN = (): string => 'login';

export const PATH_TRANSACTION = (sourceId?: string, targetId?: string): string => {
  if (sourceId && targetId) {
    return `transaction/${sourceId}/${targetId}`;
  }

  return 'transaction/:sourceId/:targetId';
};
