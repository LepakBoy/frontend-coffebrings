/* eslint-disable @next/next/no-img-element */
<<<<<<< HEAD
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { HeaderComponent, FooterComponent } from "components/modules";
import { useRouter } from "next/router";
import { getDataCookie } from "middleware/authorizationPage";
import { postProduct, getAllProduct } from "stores/action/allProduct";
=======
import React, { useState, useEffect } from "react";
import { HeaderComponent, FooterComponent } from "components/modules";
import { useRouter } from "next/router";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
>>>>>>> 5a843c9839e6703737a697174dfdbea0a0c6b5e3

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const initialState = {
  name: "",
  price: "",
  category: "",
  description: "",
  size: "",
  image: null,
};

const stateParams = {
  page: 1,
  limit: 6,
  category: "",
  search: "",
  sort: "",
  order: "ASC",
};

function NewProduct() {
<<<<<<< HEAD
  const [form, setForm] = useState(initialState);
  const [params, setParams] = useState(stateParams);
  const [image, setImage] = useState("");

  const inputSize = ["R", "L", "XL"];
  const inputGram = ["250", "300", "500"];

  const dispatch = useDispatch();
  const target = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSize = () => {
    setForm({
      ...form,
      size: inputSize.toString(),
    });
  };

  const handleGram = () => {
    setForm({
      ...form,
      size: inputGram.toString(),
    });
  };

  const resetForm = () => {
    setForm(initialState);
    setImage("");
    setIsUpdate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const data in form) {
      formData.append(data, form[data]);
    }

    dispatch(postProduct(formData))
      .then((res) => {
        alert(res.value.data.msg);

        dispatch(
          getAllProduct(
            params.page,
            params.limit,
            params.category,
            params.search,
            params.sort,
            params.order
          )
        );
      })
      .catch((err) => {
        err.response.data.msg && alert(err.response.data.msg);
      });

    resetForm();
  };
=======
  const router = useRouter();
  const [idProduct, setIdProduct] = useState(router.query.id);
  const [dataProduct, setDataProdcut] = useState({});

  useEffect(() => {
    axios
      .get(`/product/${idProduct}`)
      .then((res) => {
        console.log(res);
        setDataProdcut(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(dataProduct, "data");
>>>>>>> 5a843c9839e6703737a697174dfdbea0a0c6b5e3

  return (
    <>
      <HeaderComponent />
      <section className="new__product">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              {/* <nav style="--bs-breadcrumb-divider: '>'"> */}
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Product</a>
                  </li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
              </nav>
              <div className="new__product--left">
                <div className="new__product--left--content">
                  <div className="wrapper__image">
                    {image ? (
                      <>
                        <figure className="product">
                          <img
                            src={
                              image
                                ? image
                                : form.image
                                ? `${process.env.URL_BACKEND}/uploads/product/${form.image}`
                                : "/assets/images/default.png"
                            }
                            alt="product"
                            className="rounded-circle"
                          />
                        </figure>
                      </>
                    ) : (
                      <figure>
                        <img
                          src="/assets/images/icons/icon-camera.svg"
                          alt="c"
                        />
                      </figure>
                    )}

                    <input
                      type="file"
                      style={{ display: "none" }}
                      name="image"
                      ref={target}
                      onChange={handleFile}
                    />
                  </div>

                  <button
                    className="btn__choose--file d-block mb-3"
                    onClick={() => target.current.click()}
                  >
                    Choose from Gallery
                  </button>
                  <button
                    className="btn__save d-block mb-3"
                    onClick={handleSubmit}
                  >
                    Save Product
                  </button>
                  <button className="btn__cancel d-block" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="new__product--right">
                <div className="new__product--right--content mx-auto">
                  <div className="form-group position-relative">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      placeholder="Type product name min. 50 characters"
                      className="form__input--add"
                      name="name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="price">Price:</label>
                        <input
                          type="number"
                          placeholder="Type the price"
                          className="form__input--add"
                          name="price"
                          onChange={handleChange}
                          value={form.price}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="category">Category:</label>
                        <select
                          className="form-select form__input--add"
                          aria-label="Default select example"
                          name="category"
                          onChange={handleChange}
                          value={form.category}
                        >
                          <option>Select category</option>
                          <option value="Coffe">Coffe</option>
                          <option value="Non Coffe">Non Coffe</option>
                          <option value="Foods">Foods</option>
                          <option value="Add-on">Add-on</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group position-relative">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      placeholder="Describe your product min. 150 characters"
                      className="form__input--add desc"
                      name="description"
                      maxLength="150"
                      onChange={handleChange}
                      value={form.description}
                    ></textarea>
                  </div>

                  <div className="form-group position-relative mb-0">
                    <label htmlFor="size">Input product size:</label>
                    <p>Click size you want to use for this product</p>

                    <div className="size__wrapper--info">
                      <div
                        className="size__wrapper--info--content rounded-circle"
                        onClick={handleSize}
                      >
                        <span className="span-size">R</span>
                      </div>
                      <div
                        className="size__wrapper--info--content rounded-circle"
                        onClick={handleSize}
                      >
                        <span className="span-size">L</span>
                      </div>
                      <div
                        className="size__wrapper--info--content rounded-circle"
                        onClick={handleSize}
                      >
                        <span className="span-size">XL</span>
                      </div>
                      <div
                        className="size__wrapper--info--content gram rounded-circle"
                        onClick={handleGram}
                      >
                        <span className="span-size">
                          250 <span className="text-center d-block">gr</span>
                        </span>
                      </div>
                      <div
                        className="size__wrapper--info--content gram rounded-circle"
                        onClick={handleGram}
                      >
                        <span className="span-size">
                          300 <span className="text-center d-block">gr</span>
                        </span>
                      </div>
                      <div
                        className="size__wrapper--info--content gram rounded-circle"
                        onClick={handleGram}
                      >
                        <span className="span-size">
                          500 <span className="text-center d-block">gr</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default NewProduct;
