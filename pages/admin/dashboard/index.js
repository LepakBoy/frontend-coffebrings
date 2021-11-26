import React, { useState, useEffect } from "react";
import { HeaderComponent, FooterComponent } from "components/modules";
import { useRouter } from "next/router";
import { getDataCookie } from "middleware/authorizationPage";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "utils/axios";

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

function Dashboard() {
  const router = useRouter();

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of data",
        fill: false,
        backgroundColor: "#6a4029",
        borderColor: "#ffba33",
        data: [],
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [filter, setFilter] = useState("monthly");

  const getDashboard = () => {
    axios
      .get(`${process.env.URL_BACKEND}/dashboard?filter=${filter}`)
      .then((res) => {
        const result = res.data.data;
        router.push(`/admin/dashboard?filter=${filter}`);

        let labelDashboard = [];
        let dataDashboard = [];

        filter === "daily"
          ? result?.map((item) => {
              labelDashboard.push(item.day);
              dataDashboard.push(item.total);
            })
          : result?.map((item) => {
              labelDashboard.push(item.month);
              dataDashboard.push(item.total);
            });

        setData({
          labels: labelDashboard,
          datasets: [
            {
              label: "# of data",
              fill: false,
              backgroundColor: "#6a4029",
              borderColor: "#ffba33",
              data: dataDashboard,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDashboard();
  }, []);

  useEffect(() => {
    getDashboard();
  }, [filter]);

  return (
    <>
      <HeaderComponent />
      <section className="dashboard__page">
        <div className="container">
          <h5 className="rubik-700 text-center">
            See how your store progress so far
          </h5>

          <div className="d-flex justify-content-center mt-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => setFilter("daily")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Daily
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => setFilter("weekly")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Weekly
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => setFilter("monthly")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Monthly
              </label>
            </div>
          </div>

          <div className="dashboard__page--chart mt-4">
            <h5 className="rubik-700">Monthly Report</h5>
            {/* <span className="text-secondary rubik-400">Last 9 months</span> */}

            <div>
              <Line data={data} options={options} />
            </div>
          </div>

          <div className="text-center">
            <button className="dashboard__button nunito-700">
              Download Report
            </button>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default Dashboard;
