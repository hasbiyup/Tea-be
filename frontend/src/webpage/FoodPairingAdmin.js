import "../components/dashboard/dashboard.css";

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import Sidebar from "../components/dashboard/Sidebar.js";

const TeaMenuAdmin = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <Sidebar>
      <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: "24px" }}>
        <Col md={9}>
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">
            Teanology Tea Menu
          </h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>Admin
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">
          Manage your tea menu data on this page
        </p>
      </Row>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i class="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Tea Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add tea menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control className="form-data" type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Status</Form.Label>
                  <Form.Control className="form-data" type="text" placeholder="Status" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control className="form-data" type="text" placeholder="Ingredients" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Image</Form.Label>
                  <Form.Control className="form-data" type="file" placeholder="Choose Image" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Descryption</Form.Label>
                  <Form.Control style={{ borderRadius: "20px" }} as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="pagination-button btn-light text-light">Save</Button>
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
              <th scope="col" width="5%">
                #
              </th>
              <th scope="col" width="15%">
                Name
              </th>
              <th scope="col" width="10%">
                Status
              </th>
              <th scope="col" width="20%">
                Ingredients
              </th>
              <th scope="col" width="10%">
                Image
              </th>
              <th scope="col" width="20%">
                Descryption
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
            <tr>
              <td>1</td>
              <td>Nama Minuman</td>
              <td>Best Seller</td>
              <td>Air, teh</td>
              <td>Image</td>
              <td>lorem ipsum</td>
              <td>2023/05/11</td>
              <td className="d-flex justify-content-center">
                {/* Edit data */}
                <Button className="bg-warning btn-light rounded-2" size="sm" onClick={handleShowEdit}>
                  <i class="bi bi-pen text-light fs-5"></i>
                </Button>
                <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Tea Menu</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="form-data" type="text" placeholder="Enter email" />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Status</Form.Label>
                        <Form.Control className="form-data" type="text" placeholder="Status" />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control className="form-data" type="text" placeholder="Ingredients" />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Image</Form.Label>
                        <Form.Control className="form-data" type="file" placeholder="Choose Image" />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Descryption</Form.Label>
                        <Form.Control style={{ borderRadius: "20px" }} as="textarea" rows={3} />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                    <Button className="btn-warning text-light" style={{ borderRadius: "100px" }}>Edit</Button>
                  </Modal.Footer>
                </Modal>
                {/* Delete */}
                <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={handleShowDelete}>
                  <i class="bi bi-trash3 text-light fs-5"></i>
                </Button>
                  <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete tea menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure, want to delete item 1?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn-danger text-light" style={{ borderRadius: "100px" }}>
                        Delete
                      </Button>
                      <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseDelete}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
              </td>
            </tr>
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