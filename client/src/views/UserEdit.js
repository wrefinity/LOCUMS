import React, { useState } from "react";
import { counties, user } from "../data/api";
import Notifications from "components/Notification/Notification";

import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function UserEdit({ currentUser }) {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [userData, setUserData] = useState(currentUser);

  async function editProfile() {
    await axios
      .patch(user.editUser + "/" + userData._id, userData)
      .then((res) => {
        if (res.data.status) {
          setNotificationDetails({
            msg: "User Updated Successfully",
            type: "success",
            change: res.data.change,
          });
          setUserData(res.data.data);
        } else {
          setNotificationDetails({
            msg: "Error Updating User",
            type: "Danger",
          });
        }
        setNotificationStatus(true);
      });
  }

  return (
    <>
      {notificationStatus === true ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        {Object.keys(userData || {}).length > 0 ? (
          <Row>
            <Col md="12">
              {notificationStatus ? (
                <Notifications details={notificationDetails} />
              ) : null}
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Full Name</label>
                          <Input
                            defaultValue={userData.fullname}
                            placeholder="Full Name"
                            type="text"
                            onChange={(e) => {
                              userData.fullname = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue={userData.email}
                            placeholder="Email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={userData.username}
                            placeholder="Username"
                            type="text"
                            onChange={(e) => {
                              userData.username = e.target.value;
                            }}
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Job Type</label>
                          <Input
                            defaultValue={userData.jobType}
                            placeholder="Job Type"
                            type="select"
                            onChange={(e) => {
                              userData.jobType = e.target.value;
                            }}
                          >
                            <option>Permanent</option>
                            <option>Temporary</option>
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Gender</label>
                          <Input
                            defaultValue={userData.gender}
                            placeholder="Gender"
                            type="select"
                            onChange={(e) => {
                              userData.gender = e.target.value;
                            }}
                          >
                            <option>Male</option>
                            <option>Female</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>PSNI Number</label>
                          <Input
                            defaultValue={userData.psniNumber}
                            placeholder="PSNI Number"
                            type="text"
                            onChange={(e) => {
                              userData.psniNumber = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            defaultValue={userData.phone}
                            placeholder="Phone"
                            type="text"
                            onChange={(e) => {
                              userData.phone = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md="4">
                        <FormGroup>
                          <label>Resume</label>
                          <Input
                            defaultValue={userData.resume}
                            placeholder="Upload your resume"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              userData.resume = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col md="4">
                        <FormGroup>
                          <label>Occupation</label>
                          <Input
                            defaultValue={userData.occupation}
                            placeholder="Occupation"
                            type="select"
                            onChange={(e) => {
                              userData.occupation = e.target.value;
                            }}
                          >
                            {[
                              "doctor",
                              "nurse",
                              "pharmacist",
                              "health care assistant",
                            ].map((county, key) => {
                              return <option key={key}>{county}</option>;
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Dispensing Software</label>
                          <Input
                            defaultValue={userData.dispensing_software}
                            placeholder="Enter your dispensing software"
                            type="text"
                            onChange={(e) => {
                              userData.dispensing_software = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {/* <Col md="4">
                        <FormGroup>
                          <label>Registration Number</label>
                          <Input
                            defaultValue={userData.regNumber}
                            placeholder="Enter your registration number"
                            type="text"
                            onChange={(e) => {
                              userData.regNumber = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col md="4">
                        <FormGroup>
                          <label>County</label>
                          <Input
                            defaultValue={userData.county}
                            placeholder="County"
                            type="select"
                            onChange={(e) => {
                              userData.county = e.target.value;
                            }}
                          >
                            {counties.map((county, key) => {
                              return <option key={key}>{county}</option>;
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue={userData.city}
                            placeholder="City"
                            type="text"
                            onChange={(e) => {
                              userData.city = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={userData.address}
                            placeholder="Enter your address"
                            type="text"
                            onChange={(e) => {
                              userData.address = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Profile Summary</label>
                          <Input
                            defaultValue={userData.profileSummary}
                            placeholder="Tell us about yourself"
                            type="textarea"
                            onChange={(e) => {
                              userData.profileSummary = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Professional Headline</label>
                          <Input
                            defaultValue={userData.professionalHeadline}
                            placeholder="Professional Headline"
                            type="textarea"
                            onChange={(e) => {
                              userData.professionalHeadline = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Additional Info</label>
                          <Input
                            defaultValue={userData.info}
                            placeholder="Enter any additional information"
                            type="textarea"
                            onChange={(e) => {
                              userData.info = e.target.value;
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label>Can Relocate?</label>
                          <Input
                            defaultValue={userData.canRelocate}
                            placeholder="Enter whether you can relocate"
                            type="select"
                            onChange={(e) => {
                              userData.canRelocate = e.target.value;
                            }}
                          >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    onClick={editProfile}
                    className="btn-fill"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    </>
  );
}

export default UserEdit;
