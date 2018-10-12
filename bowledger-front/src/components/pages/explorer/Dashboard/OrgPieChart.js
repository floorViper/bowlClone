import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardHeader, CardBody } from 'reactstrap';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#7C7C7C'];
class OrgPieChart extends Component {
  state = {
    pie: {
      labels: ['OrdererMSP', 'Org1MSP', 'Org2MSP'],
      datasets: [
        {
          data: [3, 40, 23],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }
  };
  orgDataSetup = orgData => {
    //console.log('setpp:', orgData);
    let temp = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }]
    };

    orgData.forEach((element, index) => {
      temp.labels.push(element.creator_msp_id);
      temp.datasets[0].data.push(element.count);
      temp.datasets[0].backgroundColor.push(colors[index]);
      temp.datasets[0].hoverBackgroundColor.push(colors[index]);
    });
    this.setState({ pie: temp });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactionByOrg !== this.props.transactionByOrg) {
      this.orgDataSetup(nextProps.transactionByOrg);
    }
  }

  componentDidMount() {
    if (this.props.transactionByOrg == undefined) {
      console.log('returnORGPIE');
      return null;
    }
    this.orgDataSetup(this.props.transactionByOrg);
  }
  render() {
    const { pie } = this.state;
    return (
      <Card>
        <CardHeader>
          Pie Chart
          <div className="card-actions">
            <a href="http://www.chartjs.org">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <div className="chart-wrapper">
            <Pie data={pie} />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default OrgPieChart;
