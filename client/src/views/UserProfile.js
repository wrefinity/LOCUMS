import React, { useState } from "react";
import ReactSwitch from "react-switch";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Branches from "./Branches";
import Jobs from "./Jobs";
import UserEdit from "./UserEdit";
import Notifications from "components/Notification/Notification";

import axios from "axios";
import { user } from "data/api";

const UserProfile = ({ userData, setUserData }) => {
  const [view, setView] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  async function editProfile(status) {
    await axios
      .patch(user.editUser + "/" + userData._id, { status })
      .then((res) => {
        if (res.data.status) {
          setNotificationDetails({
            msg: "User Updated Successfully",
            type: "success",
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
      {notificationStatus ? (
        <Notifications details={notificationDetails} />
      ) : null}

      <Row className="mt-4">
        <Col xs="12" md="4">
          <Card style={{ textAlign: "center" }}>
            {userData.image && (
              <CardImg
                top
                src={userData.image}
                alt="userData Profile Image"
                style={{ objectFit: "cover", height: "100%" }}
              />
            )}
            <div>
              <CardTitle>{userData.fullname}</CardTitle>
              <p className="mb-0">{userData.userDataname}</p>
              <p className="text-muted">{userData.email}</p>
            </div>
          </Card>
        </Col>
        <Col xs="12" md="8">
          <Card>
            <CardBody>
              <CardTitle
                style={{
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                Profile Details
                <Button
                  className="btn-fill"
                  size="sm"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    setView("EditUser");
                    toggle();
                  }}
                >
                  Edit User
                </Button>
                <ReactSwitch
                  onChange={(e) =>
                    editProfile(
                      userData.status === "active" ? "inactive" : "active"
                    )
                  }
                  checked={userData.status === "active" ? true : false}
                />
              </CardTitle>

              <Row>
                <Col md="6">
                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>
                  <p>
                    <strong>Job Type:</strong> {userData.jobType}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone}
                  </p>
                  <p>
                    <strong>PSNI Number:</strong> {userData.psniNumber}
                  </p>
                  <p>
                    <strong>Professional Headline:</strong>{" "}
                    {userData.professionalHeadline}
                  </p>
                </Col>
                <Col md="6">
                  <p>
                    <strong>Gender:</strong> {userData.gender}
                  </p>

                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <p>
                    <strong>City:</strong> {userData.city}
                  </p>
                  <p>
                    <strong>County:</strong> {userData.county}
                  </p>
                  <p>
                    <strong>Registration Number:</strong> {userData.regNumber}
                  </p>
                </Col>
              </Row>
              <hr />
              <p>
                <strong>Profile Summary:</strong> {userData.profileSummary}
              </p>
              <p>
                <strong>Eir Code:</strong> {userData.eir_code}
              </p>
              {userData.occupation && (
                <p>
                  <strong>Occupation:</strong> {userData.occupation.name} (
                  {userData.occupation.category})
                </p>
              )}
              <p>
                <strong>Can Relocate:</strong>{" "}
                {userData.canRelocate ? "Yes" : "No"}
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          className="btn-fill"
          size="sm"
          color="primary"
          type="submit"
          onClick={() => {
            setView("Branch");
            toggle();
          }}
        >
          Branches
        </Button>
        <Button
          onClick={() => {
            setView("Jobs");
            toggle();
          }}
          className="btn-fill"
          size="sm"
          color="primary"
          type="submit"
        >
          Posted Jobs
        </Button>
        <Button className="btn-fill" size="sm" color="primary" type="submit">
          Applied jobs
        </Button>
      </div>
      <hr />

      <Modal isOpen={modal} size="lg">
        <ModalHeader toggle={toggle}>Showing {view}</ModalHeader>
        <ModalBody>
          {view === "Branch" ? <Branches currentUser={userData} /> : null}
          {view === "Jobs" ? <Jobs currentUser={userData} /> : null}
          {view === "Applied Jobs" ? <Jobs /> : null}

          {view === "EditUser" ? <UserEdit currentUser={userData} /> : null}
        </ModalBody>
      </Modal>
    </>
  );
};
export default UserProfile;
