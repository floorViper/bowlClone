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

const PeersHelth = ({ peerStatus }) => {
  if (peerStatus == undefined) {
    console.log('return PEAR');
    return null;
  }
  const peerList = peerStatus.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.server_hostname}</td>
        <td>
          {item.status === 'DOWN' ? (
            <Badge color="danger">{item.status}</Badge>
          ) : (
            <Badge color="success">{item.status}</Badge>
          )}
        </td>
      </tr>
    );
  });

  return (
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify" /> Peer
      </CardHeader>
      <CardBody>
        <Table responsive striped>
          <thead>
            <tr>
              <th>PeerName</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{peerList}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default PeersHelth;
