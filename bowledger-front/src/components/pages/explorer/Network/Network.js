import React from 'react';
import MainTemplate from 'components/pageTemplate/MainTemplate';
import PageWrapper from 'components/common/PageWrapper';
import NetworkContainer from './NetworkContainer';

const Network = () => {
  return (
    <MainTemplate>
      <PageWrapper>
        <NetworkContainer />
      </PageWrapper>
    </MainTemplate>
  );
};

export default Network;
