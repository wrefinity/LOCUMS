import React, { useState, useEffect } from "react";
import { authenticate } from "../data/api";
import Notifications from "components/Notification/Notification";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTie,
  FaVenusMars,
  FaSuitcase,
  FaIdCard,
  FaRegIdBadge,
  FaFileMedicalAlt,
  FaInfoCircle,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardFooter,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import UserEdit from "./UserEdit";

function Profile() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      await axios.get(authenticate.getUserData).then((response) => {
        if (response.data) {
          setUserData(response.data);
        } else {
          setNotificationDetails({
            msg: "Error Fetching User Details",
            type: "Danger",
          });
          setNotificationStatus(true);
        }
      });
    }
    fetchProfile();
  }, []);

  return (
    <>
      <div className="content">
        {Object.keys(userData || {}).length > 0 ? (
          <Row>
            <Col md="12">
              {notificationStatus ? (
                <Notifications details={notificationDetails} />
              ) : null}
              <Card>
                <Container className="my-5">
                  <Row>
                    <Col md={3} className="mb-4">
                      <img
                        src={
                          "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                        }
                        alt="Profile"
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col md={4} className="mb-4">
                      <h1>{userData.fullname}</h1>
                      <p className="mb-1">@ {userData.username}</p>
                      <p className="mb-1">
                        <FaEnvelope className="mr-2" />
                        {userData.email}
                      </p>
                      {userData.phone && (
                        <p className="mb-1">
                          <FaPhone className="mr-2" />
                          {userData.phone}
                        </p>
                      )}
                      <p className="mb-1">
                        <FaMapMarkerAlt className="mr-2" />
                        {userData.address}, {userData.city}, {userData.county}
                      </p>

                      <p>
                        <FaVenusMars className="mr-2" />
                        {userData.gender}
                      </p>
                      <p>
                        <FaBriefcase className="mr-2" />
                        {userData.occupation}
                      </p>
                      <p>
                        <FaCheckCircle color="" className="mr-2" />
                        {userData.status}
                      </p>
                    </Col>
                    <Col md={5}>
                      <p>
                        <FaSuitcase className="mr-2" />
                        Job Type: {userData.jobType}
                      </p>
                      <p>
                        <FaUserTie className="mr-2" />
                        Role: {userData.role}
                      </p>
                      <p>
                        <FaIdCard className="mr-2" />
                        PSNI: {userData.psniNumber}
                      </p>
                      <p>
                        <FaRegIdBadge className="mr-2" />
                        Reg No: {userData.regNumber}
                      </p>
                      <p>
                        <FaFileMedicalAlt className="mr-2" />
                        Dispensing Software: {userData.dispensing_software}
                      </p>
                      <p>
                        <FaFileMedicalAlt className="mr-2" />
                        Vetting File: {userData.vettingFile}
                      </p>
                      <p>
                        <FaMapMarkerAlt className="mr-2" />
                        Can Relocate:
                        {userData.canRelocate ? " Yes" : " No"}
                      </p>
                      <p>
                        <FaInfoCircle className="mr-2" />
                        {userData.info}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={7}>
                      <b>
                        <FaInfoCircle className="mr-2" /> Professional Headline:{" "}
                        <p className="mb-1">{userData.professionalHeadline}</p>
                      </b>
                    </Col>
                    <Col>
                      <b>
                        <FaInfoCircle className="mr-2" /> Profile Summary:{" "}
                        <p className="mb-1">{userData.profileSummary}</p>
                      </b>
                    </Col>
                  </Row>
                </Container>

                <CardFooter>
                  <Button
                    onClick={() => toggle()}
                    className="btn-fill"
                    color="primary"
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Modal isOpen={modal} size="lg">
              <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
              <ModalBody>
                <UserEdit currentUser={userData} />
              </ModalBody>
            </Modal>
          </Row>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
