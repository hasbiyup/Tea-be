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
  const [foodList, setFoodList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    const food = foodList.find((val) => val.id === id);
    setEditId(id);
    setEditData(food);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setShowDelete(true);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ings, setIngs] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [desc, setDesc] = useState("");
  const [idUser, setIdUser] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    price: 0,
    ings: "",
    img1: "",
    img2: "",
    img3: "",
    desc: "",
    userId: "",
  });

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/foods").then((response) => {
      //console.log(response.data);
      setFoodList(response.data);
    });
  }, []);

  const submitFoodData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("ings", ings);
      formData.append("img1", img1);
      formData.append("img2", img2);
      formData.append("img3", img3);
      formData.append("desc", desc);
      formData.append("userId", userId);

      const response = await Axios.post("http://localhost:5000/foods", formData, {
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
    console.log("editId:", editId);
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("price", editData.price);
      formData.append("ings", editData.ings);
      formData.append("desc", editData.desc);

      if (editData.img1) {
        formData.append("img1", editData.img1);
      }
      if (editData.img2) {
        formData.append("img2", editData.img2);
      }
      if (editData.img3) {
        formData.append("img3", editData.img3);
      }

      await Axios.put(`http://localhost:5000/foods/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      await Axios.delete(`http://localhost:5000/foods/${deleteId}`);
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
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Food Menu</h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>
            {userRole}-{userName}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">Manage your food menu data on this page</p>
      </Row>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i class="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Food Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add food menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
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
                <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Form.Group>
                </Row>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter ingredients"
                    onChange={(e) => {
                      setIngs(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Image 1</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Choose Image"
                    onChange={(e) => {
                      setImg1(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Row>
                <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                  <Form.Label>Image 2</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Choose Image"
                    onChange={(e) => {
                      setImg2(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                  <Form.Label>Image 3</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Choose Image"
                    onChange={(e) => {
                      setImg3(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                </Row>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitFoodData(userId);
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
              <th scope="col" width="10%">
                Name
              </th>
              <th scope="col" width="5%">
                Price
              </th>
              <th scope="col" width="20%">
                Ingredients
              </th>
              <th scope="col" width="20%">
                Image
              </th>
              <th scope="col" width="20%">
                Descryption
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
            {foodList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.ings}</td>
                  <td>
                    {val.img1 && <img src={`/img/${val.img1}`} alt="Food1" style={{ width: "50px" }} />}
                    {val.img2 && <img src={`/img/${val.img2}`} alt="Food2" className="ms-1" style={{ width: "50px" }} />}
                    {val.img3 && <img src={`/img/${val.img3}`} alt="Food3" className="ms-1" style={{ width: "50px" }} />}
                  </td>
                  <td>{val.desc}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td className="d-flex justify-content-center" style={{ height: '100%' }}>
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i class="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit food menu</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                          <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className="form-data" type="text" placeholder="Enter name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                          </Form.Group>
                          <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control className="form-data" type="text" placeholder="Enter price" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                          </Form.Group>
                          </Row>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control className="form-data" type="text" placeholder="Enter ingredients" value={editData.ings} onChange={(e) => setEditData({ ...editData, ings: e.target.value })} />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Image 1</Form.Label>
                            <Form.Control className="form-data" type="file" onChange={(e) => setEditData({ ...editData, img1: e.target.files[0] })} />
                          </Form.Group>
                          <Row>
                          <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                            <Form.Label>Image 2</Form.Label>
                            <Form.Control className="form-data" type="file" onChange={(e) => setEditData({ ...editData, img2: e.target.files[0] })} />
                          </Form.Group>
                          <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                            <Form.Label>Image 3</Form.Label>
                            <Form.Control className="form-data" type="file" onChange={(e) => setEditData({ ...editData, img3: e.target.files[0] })} />
                          </Form.Group>
                          </Row>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Descryption</Form.Label>
                            <Form.Control style={{ borderRadius: "20px" }} as="textarea" rows={3} placeholder="Enter description" value={editData.desc} onChange={(e) => setEditData({ ...editData, desc: e.target.value })} />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="btn-warning text-light"
                          style={{ borderRadius: "100px" }}
                          onClick={() => {
                            handleEdit(val.id);
                            handleCloseEdit();
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* Delete */}
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.name)}>
                      <i class="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete food menu</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure, want to delete food menu <span className="fw-bold">{deleteName}</span>?
                        </p>
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
