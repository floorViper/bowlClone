import React from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { runInThisContext } from 'vm';

const DashboardTemplate = ({
  dashboardHead,
  peersHelth,
  chartStats,
  timelineStream,
  orgPieChart
}) => {
  return (
    <div className="animated fadeIn">
      {dashboardHead}
      <Row>
        <Col xs="12" lg="6">
          {peersHelth}
        </Col>
        <Col xs="12" lg="6">
          {chartStats}
        </Col>
      </Row>

      <Row>
        <Col xs="12" lg="6">
          {timelineStream}
        </Col>
        <Col xs="12" lg="6">
          {orgPieChart}
        </Col>
      </Row>
    </div>
  );
};

export default DashboardTemplate;
