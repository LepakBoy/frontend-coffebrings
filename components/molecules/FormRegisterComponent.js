/* eslint-disable @next/next/no-img-element */
import { InputAuthComponent, AllButton } from "components/modules";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { Modal, Button } from "react-bootstrap";

export default function FormRegisterComponent() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    router.push("/auth/login");
  };

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  const toLogin = () => {
    router.push("/auth/login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", formRegister)
      .then((res) => {
        setShow(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  const handleChangeText = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-content">
      <div
        className="
          register-content-header
          d-flex
          justify-content-between
          px-5
          py-4
          align-items-center
        "
      >
        <div className="header-logo">
          <img
            src="/assets/images/coffee 1.png"
            alt="logo-header"
            className="logo-header"
          />
          <span className="header-title ps-2">Coffee Brings</span>
        </div>
        <div className="signup-logo">
          <span className="signup-title">Sign Up</span>
        </div>
      </div>
      <div className="wrapper-register px-4 pb-5 w-75 mx-auto">
        <div className="form-register">
          <form action="">
            <InputAuthComponent
              onChange={handleChangeText}
              name="email"
              placeholder="Enter your email address"
              type="email"
              label="Email"
            />
            <InputAuthComponent
              onChange={handleChangeText}
              name="password"
              placeholder="Enter your password"
              type="password"
              label="Password"
            />
            <InputAuthComponent
              onChange={handleChangeText}
              name="phoneNumber"
              placeholder="Enter your phone number"
              type="number"
              label="Phone Number"
            />
            <AllButton
              className="button-auth w-100 mt-5"
              text="Sign Up"
              onClick={handleSubmit}
            />
          </form>
          <p className="have-an-account text-center mt-4">
            Already have an account?
          </p>
          <AllButton
            className="button-to-login w-100 mt-3"
            text="Login Here"
            onClick={toLogin}
          />
        </div>
      </div>
      <div className="footer-auth">FOOTER</div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check your email for account activation</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
