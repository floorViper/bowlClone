import React from 'react';
import MainTemplate from 'components/pageTemplate/MainTemplate';
import PageWrapper from 'components/common/PageWrapper';
import BlockTables from './BlockTables';

const Block = () => {
  return (
    <MainTemplate>
      <PageWrapper>
        <BlockTables />
      </PageWrapper>
    </MainTemplate>
  );
};

export default Block;
