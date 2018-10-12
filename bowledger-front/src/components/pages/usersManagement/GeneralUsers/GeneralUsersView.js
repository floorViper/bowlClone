import React from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

const GeneralUsersView = ({ userPermissionList, onSubmit, onSelectAll }) => {
  if (userPermissionList == undefined) {
    console.log('return UPLy');
    return null;
  }
  const tableList = userPermissionList.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <input type="checkbox" name="user_id" value={item.user_id} />
        </td>
        <td>{index + 1}</td>
        <td>{item.user_id}</td>
        <td>{item.user_name}</td>
        <td>{item.user_req_ymd}</td>
        <td>
          {item.admin_perm === 'Y' ? (
            <Badge color="success">{item.admin_perm}</Badge>
          ) : (
            <Badge color="danger">{item.admin_perm}</Badge>
          )}
        </td>
      </tr>
    );
  });

  return (
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify" /> 일반회원 승인관리
      </CardHeader>
      <CardBody>
        <form ref={ref => (this.generalForm = ref)}>
          <Table responsive striped>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name="selectAll"
                    onChange={() => onSelectAll(this.generalForm)}
                  />
                </th>
                <th>No</th>
                <th>신청자 아이디</th>
                <th>신청자 이름</th>
                <th>신청일</th>
                <th>현재 상태</th>
              </tr>
            </thead>
            <tbody>{tableList}</tbody>
          </Table>

          <Button
            color="primary"
            onClick={() => {
              onSubmit(this.generalForm, 'permission');
            }}
          >
            승인
          </Button>
          <Button
            color="danger"
            onClick={() => {
              onSubmit(this.generalForm);
            }}
          >
            거부
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default GeneralUsersView;
