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
  const [moodBevList, setMoodBevList] = useState([]);
  const [bevOptions, setBevOptions] = useState([]);
  const [moodOptions, setMoodOptions] = useState([]);
  const [formData, setFormData] = useState({
    bev: "",
    mood: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteNameBev, setDeleteNameBev] = useState("");
  const [deleteNameFood, setDeleteNameFood] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, nameBev, nameFood) => {
    setDeleteId(id);
    setDeleteNameBev(nameBev);
    setDeleteNameFood(nameFood);
    setShowDelete(true);
  };

  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // memperbarui nilai state sesuai dengan perubahan pada elemen input
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    // Mengupdate nilai state berdasarkan perubahan pada cekbox
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...prevState[name], value] // Menambahkan nilai ke array jika cekbox tercentang
        : prevState[name].filter((item) => item !== value), // Menghapus nilai dari array jika cekbox tidak tercentang
    }));
  };

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      setBevOptions(response.data);
    });

    Axios.get("http://localhost:5000/moods").then((response) => {
      setMoodOptions(response.data);
    });

    Axios.get("http://localhost:5000/moodbevs").then((response) => {
      setMoodBevList(response.data);
    });
  }, []);

  const submitMoodBevData = () => {
    const selectedBev = bevOptions.find((option) => option.name === formData.bev);
    const selectedMoods = moodOptions.filter((option) => formData.mood.includes(option.type));

    if (selectedBev && selectedMoods.length > 0) {
      const bevId = selectedBev.id;
      const moodIds = selectedMoods.map((mood) => mood.id);

      // Send POST request to the specified endpoint
      Axios.post("http://localhost:5000/moodbevs", { bevId, moodIds })
        .then((response) => {
          console.log("Mood and beverage pairing saved successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error saving mood and beverage pairing:", error);
        });
      handleCloseAdd();
    } else {
      console.error("Invalid beverage or mood option selected.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/moodbevs/${deleteId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: "24px" }}>
        <Col md={9}>
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">
            Teanology Moods
          </h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>
            {userRole}-{userName}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">
          Manage your moods data on this page
        </p>
      </Row>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i class="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Mood Data
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
                    onChange={handleInputChange}>
                    <option value="">Select name</option>
                    {bevOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Mood</Form.Label>
                  {moodOptions.map((option) => (
                    <Form.Check
                      key={option.id}
                      type="checkbox"
                      id={option.id}
                      label={option.type}
                      name="mood"
                      value={option.type}
                      checked={formData.mood.includes(option.type)}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="pagination-button btn-light text-light" onClick={submitMoodBevData}>Save</Button>
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
                Mood Type
              </th>
              {/* <th scope="col" width="10%">
                Last Updated
              </th> */}
              <th scope="col" width="10%" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {moodBevList.map((val, index) => {
              // Mengecek apakah item sebelumnya memiliki bebida dengan nama yang sama
              const isFirstItemWithSameBev = index === 0 || moodBevList[index - 1].bevName !== val.bevName;
              return (
                <tr key={val.id}>
                  {/* Menampilkan nama bev hanya pada baris pertama dengan nama bev yang sama */}
                  {isFirstItemWithSameBev && (
                    <td rowSpan={moodBevList.filter(item => item.bevName === val.bevName).length}>
                      {val.bevName}
                    </td>
                  )}
                  <td>{val.moodType}</td>
                  {/* <td>{formatDate(val.updatedAt)}</td> */}
                  <td className="d-flex justify-content-center">
                    {/* Delete */}
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.bevName, val.foodName)}>
                      <i class="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Food Pairing</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure, want to delete mood <span className="fw-bold">{deleteNameBev}</span> ?</p>
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