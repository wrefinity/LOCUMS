import React from "react";
import { Row } from "reactstrap";
import Jobs from "./Jobs";

const BranchProfile = ({ currentBranch }) => {
  const { name, userId, county, address } = currentBranch;

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <p>
          <b>Branch : </b> {name}
        </p>
        <p>
          <b>User : </b> {userId.fullname || ""}
        </p>
        <p>
          <b>County:</b> {county}
        </p>
        <p>
          <b>Address:</b> {address}
        </p>
      </Row>

      <Jobs currentBranch={currentBranch} />
    </>
  );
};

export default BranchProfile;
