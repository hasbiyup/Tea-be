import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

import Sidebar from "../components/dashboard/Sidebar.js";

const TeaMenuAdmin = () => {
  const [foodPairingList, setFoodPairingList] = useState([]);
  const [bevOptions, setBevOptions] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [formData, setFormData] = useState({
    bev: "",
    food: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteNameBev, setDeleteNameBev] = useState("");
  const [deleteNameFood, setDeleteNameFood] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, nameBev, nameFood) => {
    console.log("ID:", id);
    console.log("bev:", nameBev);
    console.log("food:",nameFood );
    setDeleteId(id);
    setDeleteNameBev(nameBev);
    setDeleteNameFood(nameFood);
    setShowDelete(true);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // memperbarui nilai state sesuai dengan perubahan pada elemen input
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      setBevOptions(response.data);
    });

    Axios.get("http://localhost:5000/foods").then((response) => {
      setFoodOptions(response.data);
    });

    Axios.get("http://localhost:5000/foodpairings").then((response) => {
      setFoodPairingList(response.data);
    });
  }, []);

  const submitFoodPairingData = () => {
    const selectedBev = bevOptions.find((option) => option.name === formData.bev);
    const selectedFood = foodOptions.find((option) => option.name === formData.food);
    if (selectedBev && selectedFood) {
      const bevId = selectedBev.id;
      const foodId = selectedFood.id;

      // Mengirim permintaan POST ke endpoint yang ditentukan
      Axios.post("http://localhost:5000/foodpairings", { bevId, foodId, userId })
        .then((response) => {
          console.log("Food pairing saved successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error saving food pairing:", error);
        });
      handleCloseAdd();
    } else {
      console.error("Invalid beverage or food option selected.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/foodpairings/${deleteId}`);
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
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">
            Teanology Food Pairing
          </h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>
            {userRole}-{userName}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">
          Manage your food pairing data on this page
        </p>
      </Row>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i class="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Pairing
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Food Pairing Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Bev</Form.Label>
                  <Form.Select
                    className="form-data"
                    name="bev"
                    value={formData.bev}
                    onChange={handleInputChange}
                  >
                    <option value="">Select name</option>
                    {bevOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Food</Form.Label>
                  <Form.Select
                    className="form-data"
                    name="food"
                    value={formData.food}
                    onChange={handleInputChange}
                  >
                    <option value="">Select name</option>
                    {foodOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="pagination-button btn-light text-light" onClick={submitFoodPairingData} >Save</Button>
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
                Name Bev
              </th>
              <th scope="col" width="10%">
                Name Food
              </th>
              <th scope="col" width="10%">
                Nama User
              </th>
              <th scope="col" width="10%">
                Last Updated
              </th>
              <th scope="col" width="10%" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {foodPairingList.map((val) => {
              return (
              <tr key={val.id}>
                <td>{val.bevName}</td>
                <td>{val.foodName}</td>
                <td>{val.userName}</td>
                <td>{formatDate(val.updatedAt)}</td>
                <td className="d-flex justify-content-center">
                  {/* Edit data */}
                  <Button className="bg-warning btn-light rounded-2" size="sm" onClick={handleShowEdit}>
                    <i class="bi bi-pen text-light fs-5"></i>
                  </Button>
                  <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Food Pairing</Modal.Title>
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
                      <Button className="btn-warning text-light" style={{ borderRadius: "100px" }}>Edit</Button>
                      <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* Delete */}
                  <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.bevName, val.foodName)}>
                    <i class="bi bi-trash3 text-light fs-5"></i>
                  </Button>
                  <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Food Pairing</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure, want to delete <span className="fw-bold">{deleteNameBev} & {deleteNameFood}</span> ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button
                          className="btn-danger text-light"
                          style={{ borderRadius: "100px" }}
                          onClick={() => {
                            handleDelete(val.id);
                            handleCloseDelete();
                          }}
                        >
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