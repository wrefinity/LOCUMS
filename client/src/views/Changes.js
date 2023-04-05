import React, { useState, useEffect } from "react";
import axios from "axios";
import { changes } from "../data/api";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import Notifications from "components/Notification/Notification";
import RPagination from "components/Pagination/Pagination";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Changes() {
  const [change, setChange] = useState([]);
  const [pagination, setPagination] = useState({ current: 1 });

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  useEffect(() => {
    //{params:{store}} for get request
    async function fetchChanges() {
      await axios
        .get(changes.showChanges, { params: { ...pagination } })
        .then((response) => {
          if (response.data.status === true) {
            if (response.data.data) {
              setChange(response.data.data[0].data);
            }
            if (pagination.current === 1) {
              setPagination({ ...pagination, count: response.data.count });
            }
          } else {
            setNotificationDetails({
              msg: "Error Loading Changes, Please Referesh The Page",
              type: "danger",
            });
            setNotificationStatus(true);
          }
        });
    }
    fetchChanges();
    // eslint-disable-next-line
  }, [pagination.current]);

  return (
    <>
      {notificationStatus === true ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Track Changes</CardTitle>
                Total Records: <b>{pagination.count || 0}</b>, Limit: 200
              </CardHeader>

              <CardBody>
                <Table
                  className="tablesorter"
                  responsive
                  style={{ overflow: "unset" }}
                >
                  <thead className="text-primary">
                    <tr>
                      <th>Change</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {change.map((changeItem, key) => (
                      <tr key={key}>
                        <td>
                          Date:{" "}
                          {parse(
                            dateFormat(
                              changeItem.date,
                              " h:MM:ss TT, dddd, mmmm dS, yyyy"
                            )
                          )}
                          <br />
                          {parse(changeItem.message)}
                        </td>
                        <td>{changeItem.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <RPagination
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Changes;
