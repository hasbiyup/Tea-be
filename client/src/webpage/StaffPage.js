import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import Sidebar from "../components/dashboard/Sidebar.js";

const TeaMenuAdmin = () => {
  const [staffList, setStaffList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/users").then((response) => {
      //console.log(response.data);
      setStaffList(response.data);
    });
  }, []);

  const submitStaffData = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      // alert("Berhasil Insert");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/users/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const updatedAt = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return updatedAt.toLocaleDateString("id-ID", options);
  };

  return (
    <Sidebar>
      <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: "24px" }}>
        <Col md={9}>
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Staff Data</h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>{userRole}{userName}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">Manage your staff data on this page</p>
      </Row>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i class="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Staff Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Staff name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="email"
                    placeholder="example@mail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Role"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitStaffData();
                  handleCloseAdd();
                }}
              >
                Save
              </Button>
              <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseAdd}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col md={4}>
          <Form className="d-flex margin-search" style={{ marginRight: "18%" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="search-icon" id="basic-addon1">
                <i class="bi bi-search fs-6 text-muted"></i>
              </InputGroup.Text>
              <Form.Control className="search-data" type="search" placeholder="Search data" aria-label="Search" />
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row className="margin-table">
        <Table responsive>
          <thead>
            <tr>
              <th scope="col" width="15%">
                Name
              </th>
              <th scope="col" width="20%">
                Email
              </th>
              <th scope="col" width="20%">
                Role
              </th>
              <th scope="col" width="10%">
                Date
              </th>
              <th scope="col" width="10%" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={handleShowEdit}>
                      <i class="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Staff Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className="form-data" type="text" placeholder="Staff name" />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="form-data" type="email" placeholder="example@mail.com" />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="form-data" type="password" placeholder="Enter password" />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control className="form-data" type="text" placeholder="Role" />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn-warning text-light" style={{ borderRadius: "100px" }}>
                          Edit
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* Delete */}
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={handleShowDelete}>
                      <i class="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Staff</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure, want to delete item 1?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn-danger text-light" style={{ borderRadius: "100px" }} onClick={() => {
                            handleDelete(val.id);
                            handleCloseDelete();
                          }}>
                          Delete
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseDelete}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>

      <Row className="margin-table d-flex">
        <Col md={6} className="page-total">
          <p>Page 1 from 3 pages</p>
          <p style={{ marginTop: "-16px" }}>
            Total data : <span className="fw-bold">10</span>
          </p>
        </Col>
        <Col md={6}>
          <Button className="pagination-button text-light btn-light float-end ms-2">Next</Button>
          <Button className="pagination-button text-light btn-light float-end">Previous</Button>
        </Col>
      </Row>
    </Sidebar>
  );
};

export default TeaMenuAdmin;
