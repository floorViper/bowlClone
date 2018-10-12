import React from 'react';
import MainTemplate from 'components/pageTemplate/MainTemplate';
import PageWrapper from 'components/common/PageWrapper';
import GeneralUsersContainer from './GeneralUsersContainer';

const GeneralUsers = () => {
  return (
    <MainTemplate>
      <PageWrapper>
        <GeneralUsersContainer />
      </PageWrapper>
    </MainTemplate>
  );
};

export default GeneralUsers;
