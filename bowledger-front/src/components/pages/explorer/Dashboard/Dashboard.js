import React from 'react';
import MainTemplate from 'components/pageTemplate/MainTemplate';
import PageWrapper from 'components/common/PageWrapper';
import DashboardContainer from './DashboardContainer';

const Dashboard = () => {
  return (
    <MainTemplate>
      <PageWrapper>
        <DashboardContainer />
      </PageWrapper>
    </MainTemplate>
  );
};

export default Dashboard;
