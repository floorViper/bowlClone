import React from 'react';
import MainTemplate from 'components/pageTemplate/MainTemplate';
import PageWrapper from 'components/common/PageWrapper';
import LoginUI from './LoginUI';

const Login = () => {
  return (
    <MainTemplate>
      <PageWrapper>
        <LoginUI />
      </PageWrapper>
    </MainTemplate>
  );
};

export default Login;
