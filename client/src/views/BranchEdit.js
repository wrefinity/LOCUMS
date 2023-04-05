import React, { useState } from "react";
import axios from "axios";
import Notifications from "components/Notification/Notification";
import { branch, counties } from "../data/api";
import LoadingOverlay from "react-loading-overlay";

// reactstrap components
import { Button, FormGroup, Form, Input, Row, Col } from "reactstrap";

function BranchEdit({ fetchBranches, currentBranch, setCurrentBranch }) {
  const [branchData, setBranchData] = useState(currentBranch);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [requestLoading, setRequestLoading] = useState(false);

  async function updateBranch(e) {
    let data = { ...branchData };
    e.preventDefault();
    setRequestLoading(true);
    if (data.name === "" || data.address === "" || data.userId === "") {
      setNotificationDetails({
        msg: "Some Branch Fields are Empty",
        type: "danger",
      });
      setNotificationStatus(true);
    } else {
      await axios
        .patch(branch.editBranch + "/" + branchData._id, data)
        .then((res) => {
          if (res.data.status) {
            setCurrentBranch(res.data.data);
            fetchBranches();
            setNotificationDetails({
              msg: "Branch Updated Successfully",
              type: "success",
            });
          } else {
            setNotificationDetails({
              msg: "Error updating Branch, make sure all fields are filled or try refreshing page.",
              type: "danger",
            });
          }
          setNotificationStatus(true);
        });
    }
    setRequestLoading(false);
  }

  return (
    <>
      {notificationStatus ? (
        <Notifications details={notificationDetails} />
      ) : null}{" "}
      <LoadingOverlay
        active={requestLoading}
        spinner
        text="Loading your request..."
      >
        <div>
          <Form>
            <>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Branch Name</label>
                    <Input
                      placeholder="Branch Name"
                      defaultValue={branchData.name}
                      type="text"
                      onChange={(e) =>
                        setBranchData({
                          ...branchData,
                          name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <label for="pay">County</label>
                    <Input
                      type="select"
                      defaultValue={branchData.county}
                      onChange={(e) =>
                        setBranchData({
                          ...branchData,
                          county: e.target.value,
                        })
                      }
                    >
                      <option value="" hidden disabled selected>
                        Select County
                      </option>
                      {counties.map((item, key) => {
                        return (
                          <option key={key + item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <label>Address</label>
                    <Input
                      cols="80"
                      placeholder="185 K Street..."
                      rows="2"
                      type="textarea"
                      defaultValue={branchData.address}
                      onChange={(e) =>
                        setBranchData({
                          ...branchData,
                          address: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button
                className="btn-fill"
                style={{ width: "100%" }}
                color="primary"
                type="submit"
                onClick={(e) => {
                  updateBranch(e);
                }}
              >
                Update Branch
              </Button>
            </>
          </Form>

          <hr />
        </div>{" "}
      </LoadingOverlay>
    </>
  );
}

export default BranchEdit;
