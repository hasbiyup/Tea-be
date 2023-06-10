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
  const [bevList, setBevList] = useState([]);
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
  const [price, setPrice] = useState(0);
  const [ings, setIngs] = useState("");
  const [img, setImg] = useState("");
  const [highlight, setHighlight] = useState("");
  const [brew, setBrew] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [idUser, setIdUser] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    price: 0,
    ings: "",
    img: "",
    highlight: "",
    brew: "",
    desc: "",
    type: "",
    userId: "",
  });

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      //console.log(response.data);
      setBevList(response.data);
    });
  }, []);

  const submitBevData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("ings", ings);
      formData.append("img", img);
      formData.append("highlight", highlight);
      formData.append("brew", brew);
      formData.append("desc", desc);
      formData.append("type", type);
      formData.append("userId", userId);

      const response = await Axios.post("http://localhost:5000/bevs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await Axios.put(`http://localhost:5000/bevs/${editId}`, {
        name: editData.name,
        price: editData.price,
        ings: editData.ings,
        img: editData.img,
        img: editData.highlight,
        img: editData.brew,
        desc: editData.desc,
        desc: editData.type,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/bevs/${deleteId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar>
      <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: "24px" }}>
        <Col md={9}>
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Tea Menu</h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>
            {userRole}-{userName}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">Manage your tea menu data on this page</p>
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
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Ingredients"
                    onChange={(e) => {
                      setIngs(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Choose Image"
                    onChange={(e) => {
                      setImg(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Highlight</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter highlight"
                    onChange={(e) => {
                      setHighlight(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Brew</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter brew"
                    onChange={(e) => {
                      setBrew(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Descryption</Form.Label>
                  <Form.Control
                    style={{ borderRadius: "20px" }}
                    as="textarea"
                    rows={3}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter type"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitBevData(userId);
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
              <th scope="col" width="5%">
                Price
              </th>
              <th scope="col" width="10%">
                Ingredients
              </th>
              <th scope="col" width="10%">
                Image
              </th>
              <th scope="col" width="10%">
                Highlight
              </th>
              <th scope="col" width="10%">
                Brew
              </th>
              <th scope="col" width="15%">
                Descryption
              </th>
              <th scope="col" width="5%">
                Type
              </th>
              <th scope="col" width="10%">
                Last Update
              </th>
              <th scope="col" width="10%" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {bevList.map((val) => {
            return (
            <tr key={val.id}>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>{val.ings}</td>
              <td>
                <img src={`/bev-img/${val.img}`} alt="Bev" style={{ width: "100px" }}/>
              </td>
              <td>{val.highlight}</td>
              <td>{val.brew}</td>
              <td>{val.desc}</td>
              <td>{val.type}</td>

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
                        <Form.Control className="form-data" type="text" placeholder="Enter name" />
                      </Form.Group>
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control className="form-data" type="text" placeholder="Price" />
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
                    <Button className="btn-warning text-light" style={{ borderRadius: "100px" }}>
                      Edit
                    </Button>
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
