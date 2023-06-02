import "./dashboard.css";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPizzaSlice, FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList } from "react-icons/fa";
import { BsCupHotFill } from "react-icons/bs";
import { GiBowlOfRice } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";

import logoAdmin from "./Logo.svg";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/tea-menu-admin",
      name: "Tea Menus",
      icon: <BsCupHotFill />,
    },
    {
      path: "/food-menu-admin",
      name: "Food Menus",
      icon: <GiBowlOfRice />,
    },
    {
      path: "/food-pairing-admin",
      name: "Food Pairing",
      icon: <IoFastFood />,
    },
    {
      path: "/staff",
      name: "Staff",
      icon: <IoMdPerson />,
    },
  ];
  return (
    <div className="admin-container">
      <div style={{ width: isOpen ? "280px" : "54px" }} className="sidebar">
        <div className="top_section">
          <img alt="top-logoAdmin" src={logoAdmin} style={{ display: isOpen ? "block" : "none" }} className="logo-admin">
          </img>
          <div style={{ marginLeft: isOpen ? "5px" : "0px", marginTop:'10px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <>
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                {item.name}
              </div>
            </NavLink>
            {item.path === "/dashboard" && <hr style={{ borderTop: "2px solid #fff", width: "85%", opacity: "0.5",marginLeft: '6%', marginTop: "5px" }} />}
          </>
        ))}
        <div className="margin-sign-out">
          <a href="/login-page">
          <Button variant="outline-light" className="sign-out" style={{ display: isOpen ? "block" : "none", width: '200px' }}>
            <NavLink to="/sign-out" className="link_text fw-bold text-light"><i class="bi bi-box-arrow-left me-3"></i>
              Sign Out
            </NavLink>
          </Button>
          </a>
        </div>
      </div>
      <main style={{ width: "100vw", overflow: "hidden" }}>{children}</main>
    </div>
  );
};

export default Sidebar;
