import React, { FunctionComponent } from 'react';

import { useLogin } from '../modules/LoginContext';

const Home: FunctionComponent = () => {
  const { user } = useLogin();

  return <>{JSON.stringify(user)}</>;
};

export default Home;
