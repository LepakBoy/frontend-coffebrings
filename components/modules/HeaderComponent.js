import React from "react";
import { useRouter } from "next/router";

function HeaderComponent() {
  const router = useRouter();
  const toLogin = () => {
    router.push("/auth/login");
  };

  const toRegister = () => {
    router.push("/auth/register");
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            CoffeBrings
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-md-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Your Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  History
                </a>
              </li>
            </ul>
            <div className="header__navbar--button d-none d-md-block">
              <a className="btn__link--signin" onClick={toLogin}>
                Signin
              </a>
              <a className="btn__link--signup" onClick={toRegister}>
                Signup
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
