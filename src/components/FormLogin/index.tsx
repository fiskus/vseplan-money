import React, { FunctionComponent, ReactElement } from 'react';

import { getApiUrl } from '../../xhr';
import * as Container from './style';
import ButtonLogin from '../ButtonLogin';

const facebookUrl = getApiUrl('/api/v1/login/facebook');
const guestUrl = getApiUrl('/api/v1/login/guest');

const LoginForm: FunctionComponent = (): ReactElement<void> => (
  <Container.Wrapper>
    <Container.Button>
      <ButtonLogin url={facebookUrl}>
        Login via Facebook
      </ButtonLogin>
    </Container.Button>

    <Container.Button>
      <ButtonLogin url={guestUrl}>
        Test Login
      </ButtonLogin>
    </Container.Button>
  </Container.Wrapper>
);

export default LoginForm;
