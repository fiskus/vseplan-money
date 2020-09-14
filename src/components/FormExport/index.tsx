import React, { FormEvent, FunctionComponent, ReactElement, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react';

import { exportCoinkeeper } from '../../xhr/export';

import * as Container from './style';

const ExportForm: FunctionComponent<RouteComponentProps> = (): ReactElement<void> => {
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!inputEl.current) {
      return;
    }

    if (inputEl.current.files && inputEl.current.files.length) {
      const fileReader = new FileReader();
      fileReader.onload = (): void => {
        if (!fileReader || !fileReader.result) {
          return;
        }
        exportCoinkeeper(fileReader.result.toString())
          .then(() => window.location.assign('/'));
      };
      fileReader.readAsText(inputEl.current.files[0]);
    }
  };

  return (
    <Container.Container onSubmit={onSubmit}>
      <input ref={inputEl} type="file" />
      <button type="submit">Export</button>
    </Container.Container>
  );
};

export default observer(ExportForm);
