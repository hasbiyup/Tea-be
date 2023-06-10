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
  const handleShowEdit = (id) => {
    const bev = bevList.find((val) => val.id === id);
    setEditId(id);
    setEditData(bev);
    setSelectedImage1(bev.img1 ? bev.img1 : null);
    setSelectedImage2(bev.img2 ? bev.img2 : null);
    setSelectedImage3(bev.img3 ? bev.img3 : null);
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
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
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
    img1: "",
    img2: "",
    img3: "",
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
      formData.append("img", img1);
      formData.append("img", img2);
      formData.append("img", img3);
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
    console.log("editId:", editId);
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("price", editData.price);
      formData.append("ings", editData.ings);
      formData.append("highlight", editData.highlight);
      formData.append("brew", editData.brew);
      formData.append("desc", editData.desc);
      formData.append("type", editData.type);

      if (editData.img1) {
        formData.append("img", editData.img1);
      }
      if (editData.img2) {
        formData.append("img", editData.img2);
      }
      if (editData.img3) {
        formData.append("img", editData.img3);
      }

      await Axios.put(`http://localhost:5000/bevs/${editId}`, formData, {
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

  const formatDate = (dateString) => {
    const updatedAt = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return updatedAt.toLocaleDateString("id-ID", options);
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
                      placeholder="Price"
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
                    placeholder="Ingredients"
                    onChange={(e) => {
                      setIngs(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Image1</Form.Label>
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
                    <Form.Label>Image2</Form.Label>
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
                    <Form.Label>Image3</Form.Label>
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
                <Row>
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
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
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
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
              <th scope="col" width="10%">
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
              <th scope="col" width="10%">
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
                    <td>
                      {val.img1 && <img src={`/bev-img/${val.img1}`} alt="Food1" style={{ width: "50px" }} />}
                      {val.img2 && <img src={`/bev-img/${val.img2}`} alt="Food2" style={{ width: "50px" }} />}
                      {val.img3 && <img src={`/bev-img/${val.img3}`} alt="Food3" style={{ width: "50px" }} />}
                    </td>
                  </td>
                  <td>{val.highlight}</td>
                  <td>{val.brew}</td>
                  <td>{val.desc}</td>
                  <td>{val.type}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i class="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Tea Menu</Modal.Title>
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
                                value={editData.name}
                                onChange={(e) => {
                                  setEditData({ ...editData, name: e.target.value });
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Price</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Price"
                                value={editData.price}
                                onChange={(e) => {
                                  setEditData({ ...editData, price: e.target.value });
                                }}
                              />
                            </Form.Group>
                          </Row>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Ingredients"
                              value={editData.ings}
                              onChange={(e) => {
                                setEditData({ ...editData, ings: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Image1</Form.Label>
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
                              <Form.Label>Image2</Form.Label>
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
                              <Form.Label>Image3</Form.Label>
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
                          <Row>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Highlight</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter highlight"
                                value={editData.highlight}
                                onChange={(e) => {
                                  setEditData({ ...editData, highlight: e.target.value });
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Brew</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter brew"
                                value={editData.brew}
                                onChange={(e) => {
                                  setEditData({ ...editData, brew: e.target.value });
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
                              value={editData.desc}
                              onChange={(e) => {
                                setEditData({ ...editData, desc: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Enter type"
                              value={editData.type}
                              onChange={(e) => {
                                setEditData({ ...editData, type: e.target.value });
                              }}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                          Cancel
                        </Button>
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
                        <p>
                          Are you sure, want to delete <span className="fw-bold">{deleteName}</span>?
                        </p>
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
