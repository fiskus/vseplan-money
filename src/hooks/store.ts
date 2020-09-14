import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';

export default function useStore<K extends string, T>(): Record<K, T> {
  return useContext<Record<K, T>>(MobXProviderContext);
}
