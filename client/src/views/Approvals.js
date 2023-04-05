import React, { useState, useEffect } from "react";
import axios from "axios";
import { approval } from "../data/api";
import { FaTrashAlt } from "react-icons/fa";
import Notifications from "components/Notification/Notification";
import { FiArrowLeft } from "react-icons/fi";
import empty from "../assets/img/product.svg";
// import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  CardText,
  Input,
  FormGroup,
  ButtonGroup,
} from "reactstrap";

function Approvals() {
  //let symbol = "₦";
  const [approvals, setApprovals] = useState([]);
  const [currentApproval, setCurrentApproval] = useState({});

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    msg: "",
    type: "",
  });
  const [dataload, setDataLoad] = useState(true);

  const { userDetail } = useAuth();

  useEffect(
    () => {
      async function fetchApprovals() {
        await axios
          .get(approval.showStoreApprovals + "/" + userDetail._id)
          .then((response) => {
            if (response.data.status === true) {
              setApprovals(response.data.data);
              setDataLoad(false);
            } else {
              setNotificationDetails({
                msg: "Error Loading Approvals, Please Referesh The Page",
                type: "danger",
              });
              setNotificationStatus(true);
              setDataLoad(false);
            }
          });
      }
      fetchApprovals();
    },
    // eslint-disable-next-line
    []
  );

  const handleRemoveItem = (e) => {
    let new_variation = [];

    new_variation = currentApproval.variations.filter((item, key) => key !== e);
    setCurrentApproval({ ...currentApproval, variations: new_variation });
    setNotificationDetails({
      msg: "Variation removed temporarily, click on 'update approval' to finalize update",
      type: "success",
    });
    setNotificationStatus(true);
  };

  async function updateApproval() {
    await axios.patch(approval.updateApproval, currentApproval).then((res) => {
      if (res.data.status) {
        setNotificationDetails({
          msg: "Approval Updated Successfully",
          type: "success",
          change: res.data.change,
        });
      } else {
        setNotificationDetails({
          msg: "Error Updating Approval",
          type: "danger",
        });
      }
      setNotificationStatus(true);
    });
  }

  const [loading, setLoading] = useState(true);

  function selectApproval(id) {
    setCurrentApproval(approvals.filter((item) => item._id === id)[0]);
    setLoading(false);
  }

  function changeVariationData(id, value, type) {
    let new_variation = currentApproval.variations;
    new_variation[id][type] = value;
    if (type === "type") {
      new_variation[id]["quantity"] = 0;
      new_variation[id]["barcodes"] = [];
    }

    setCurrentApproval({ ...currentApproval, variations: new_variation });
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    let new_var = { variation: "" };
    let new_variation = currentApproval.variations;
    new_variation.push(new_var);
    setCurrentApproval({ ...currentApproval, variations: new_variation });
  };

  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState([
    "approval_name",
    "brand",
  ]);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const result = approvals.map(({ _id, approval_name, brand }) => ({
    _id,
    approval_name,
    brand,
  }));
  const columns = result[0] && Object.keys(result[0]);

  return (
    <>
      {notificationStatus ? (
        <Notifications details={notificationDetails} />
      ) : null}
      <div className="content">
        <Row>
          <Col md="12">
            {loading === true ? (
              <Card>
                <CardHeader>
                  <CardTitle className="pull-left" tag="h4">
                    Approvals
                  </CardTitle>
                  {/* <div className="pull-right" style={{ marginBottom: "20px" }}>
                    <Link to="/admin/addapproval">
                      <Button
                        className="btn-fill"
                        style={{ width: "100%" }}
                        color="primary"
                        type="submit"
                      >
                        Add Approval
                      </Button>
                    </Link>
                  </div> */}
                  <FormGroup style={{ width: "100%" }} className="pull-right">
                    <Input
                      placeholder="Search based on checked items"
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                    />
                  </FormGroup>
                </CardHeader>

                <Col sm="12">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    {columns &&
                      columns.map((column, key) => (
                        <Button
                          tag="label"
                          className="btn-simple"
                          color="info"
                          key={key}
                          size="sm"
                          onClick={() => {
                            const checked = searchColumns.includes(column);
                            setSearchColumns((prev) =>
                              checked
                                ? prev.filter((sc) => sc !== column)
                                : [...prev, column]
                            );
                          }}
                          active={searchColumns.includes(column)}
                        >
                          {column}
                        </Button>
                      ))}
                  </ButtonGroup>
                </Col>
                {dataload === false ? (
                  <>
                    {approvals.length > 0 ? (
                      <CardBody>
                        <Table
                          className="tablesorter"
                          responsive
                          style={{ overflow: "unset" }}
                        >
                          <thead className="text-primary">
                            <tr>
                              <th>Approval Name</th>
                              <th>Brand</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {search(result).map((row, key) => (
                              <tr key={key}>
                                {columns.map((column, key) => (
                                  <>
                                    {key > 0 ? (
                                      <td key={key}>{row[column]} </td>
                                    ) : null}
                                  </>
                                ))}
                                <td>
                                  <div>
                                    <Button
                                      onClick={() => selectApproval(row._id)}
                                      className="btn-fill"
                                      size="sm"
                                      color="primary"
                                      type="submit"
                                    >
                                      Show
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </CardBody>
                    ) : (
                      <div
                        style={{
                          color: "#39B54A",
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        <img
                          src={empty}
                          style={{ marginBottom: "30px" }}
                          height="250px"
                          alt="Nothing to show yet"
                        />
                        <br />
                        <CardTitle tag="h4">
                          Nothing To Show Yet... Add Some Approvals to The
                          System
                        </CardTitle>
                      </div>
                    )}
                  </>
                ) : (
                  "Loading"
                )}
              </Card>
            ) : (
              <Button
                style={{ width: "100%", marginBottom: "15px" }}
                onClick={() => setLoading(!loading)}
                className="btn-fill"
                color="primary"
              >
                <FiArrowLeft size={20} />{" "}
                <font style={{ paddingLeft: "30px" }}>Back To Approvals </font>
              </Button>
            )}
          </Col>

          <Col md="12">
            <Card className="card-user">
              {loading === false ? (
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/product.png").default}
                      />
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Approval Name</label>
                            <Input
                              placeholder="Tecno Camon CX"
                              type="text"
                              value={currentApproval.approval_name}
                              onChange={(e) =>
                                setCurrentApproval({
                                  ...currentApproval,
                                  approval_name: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Brand</label>
                            <Input
                              placeholder="Tecno"
                              type="text"
                              value={currentApproval.brand}
                              onChange={(e) =>
                                setCurrentApproval({
                                  ...currentApproval,
                                  brand: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Description</label>
                            <Input
                              cols="80"
                              placeholder="This approvalion is a ..."
                              rows="4"
                              type="textarea"
                              value={currentApproval.approval_desc}
                              onChange={(e) =>
                                setCurrentApproval({
                                  ...currentApproval,
                                  approval_desc: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </a>
                  </div>

                  <div className="card-description">
                    {" "}
                    <thead className="text-danger">
                      <b>
                        Note: Changing a approvals type, can change its
                        variation data, including quantity.
                      </b>
                    </thead>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Variations</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentApproval.variations.map(
                          (variationItem, key) => (
                            <tr key={key}>
                              <td>
                                <Row>
                                  <Col className="pr-md-1" md="4">
                                    <FormGroup>
                                      <label>Variation</label>
                                      <Input
                                        placeholder="Black 64GB"
                                        type="text"
                                        value={variationItem.variation}
                                        onChange={(e) =>
                                          changeVariationData(
                                            key,
                                            e.target.value,
                                            "variation"
                                          )
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  {/* <Col className="pl-md-1" md="6">
                                  <FormGroup>
                                    <label>Model</label>
                                    <Input
                                      placeholder="1234"
                                      type="text"
                                      value={variationItem.model}
                                      onChange={(e) =>
                                        changeVariationData(
                                          key,
                                          e.target.value,
                                          "model"
                                        )
                                      }
                                    />
                                  </FormGroup>
                                </Col> */}

                                  {/* <Col className="pr-md-1" md="6">
                                  <FormGroup>
                                    <label>Buying Price</label>
                                    <Input
                                      placeholder="10,000"
                                      type="number"
                                      value={variationItem.buying_price}
                                      onChange={(e) =>
                                        changeVariationData(
                                          key,
                                          e.target.value,
                                          "buying_price"
                                        )
                                      }
                                    />
                                  </FormGroup>
                                </Col> */}
                                  <Col className="px-md-1" md="4">
                                    <FormGroup>
                                      <label>Selling Price</label>
                                      <Input
                                        placeholder="10,000"
                                        type="number"
                                        value={variationItem.selling_price}
                                        onChange={(e) =>
                                          changeVariationData(
                                            key,
                                            e.target.value,
                                            "selling_price"
                                          )
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col className="pl-md-1" md="4">
                                    <ButtonGroup
                                      style={{ paddingTop: "24px" }}
                                      className="btn-group-toggle float-right"
                                      data-toggle="buttons"
                                    >
                                      {["Type 1", "Type 2", "Type 3"].map(
                                        (column, key1) => (
                                          <Button
                                            tag="label"
                                            className="btn-simple"
                                            color="info"
                                            key={key1}
                                            onClick={() => {
                                              const checked =
                                                variationItem.type === column;
                                              let data = checked ? "" : column;
                                              changeVariationData(
                                                key,
                                                data,
                                                "type"
                                              );
                                            }}
                                            active={
                                              column === variationItem.type
                                            }
                                          >
                                            {column}
                                          </Button>
                                        )
                                      )}
                                    </ButtonGroup>
                                  </Col>
                                </Row>
                              </td>
                              <td
                                style={{ cursor: "pointer" }}
                                className="text-center"
                              >
                                <FaTrashAlt
                                  onClick={() => handleRemoveItem(key)}
                                  color="red"
                                />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>

                  <Row>
                    <Col md="6">
                      <Button
                        onClick={() => handleAddClick()}
                        className="btn-fill"
                        style={{ width: "100%" }}
                        color="primary"
                        type="submit"
                      >
                        Add Approval Variation
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button
                        onClick={() => updateApproval()}
                        className="btn-fill"
                        style={{ width: "100%" }}
                        color="primary"
                        type="submit"
                      >
                        Update Approval
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <div>
                    Type 1: One barcode to one approval. <br />
                    Type2: One barcode to a variation. <br />
                    Type3: Quantity only, no barcode.
                  </div>
                </CardBody>
              ) : (
                "--------------------------------"
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Approvals;
