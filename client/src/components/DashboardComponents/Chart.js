import React from "react";
import classNames from "classnames";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const Chart = (props) => {
  const { data, graphType, duration, setDuration, title, noDuration } = props;
  const gdata = {
    labels: (data || []).length > 0 ? data.map((d) => d.x) : [],
    datasets: [
      {
        label: title,
        data: (data || []).length > 0 ? data.map((d) => d.y) : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">{duration} Report</h5>
              <CardTitle tag="h2">{title}</CardTitle>
            </Col>
            {noDuration === false ? (
              <Col sm="6">
                <ButtonGroup
                  className="btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: duration === "daily",
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => {
                      setDuration("daily");
                    }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Daily
                    </span>
                    <span className="d-block d-sm-none">Daily</span>
                  </Button>
                  <Button
                    color="info"
                    id="1"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: duration === "weekly",
                    })}
                    onClick={() => {
                      setDuration("weekly");
                    }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Weekly
                    </span>
                    <span className="d-block d-sm-none">Weekly</span>
                  </Button>
                  <Button
                    color="info"
                    id="2"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: duration === "monthly",
                    })}
                    onClick={() => {
                      setDuration("monthly");
                    }}
                  >
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Monthly
                    </span>
                    <span className="d-block d-sm-none">Monthly</span>
                  </Button>
                </ButtonGroup>
              </Col>
            ) : null}
          </Row>
        </CardHeader>
        <CardBody>
          {graphType === "doughnut" ? <Doughnut data={gdata} /> : null}
          {graphType === "line" ? <Line data={gdata} /> : null}
          {graphType === "bar" ? <Bar data={gdata} /> : null}
          {/* <Line data={chartCanvasCreated} options={chartExample1.options} /> */}
        </CardBody>
      </Card>
    </>
  );
};

export default Chart;
