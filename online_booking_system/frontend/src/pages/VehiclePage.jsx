import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import DatePicker, { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import moment from "moment";
import PopUp from "../components/PopUp";

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setVehicle(data[0]))
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setMessage("Failed to load cars");
      });
  }, []);

  const getImage = (vehicle_image) => {
    return new URL(`../assets/vehicles_image/${vehicle_image}`, import.meta.url)
      .href;
  };
  const imageSrc = getImage(vehicle.image_url);

  const [dates, setDates] = useState([]);
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Vehicle Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold">{vehicle.model}</h1>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Vehicle Image
                </h3>
                <div className="flex justify-center items-center">
                  <img
                    className="h-auto w-auto"
                    src={getImage(vehicle.image_url)}
                    alt="vehicle"
                  />
                </div>
                <h3 className="text-indigo-800 text-lg font-bold mb-2 flex justify-left ">
                  Specification
                </h3>
                <div className="flex justify-left items-center">
                  {vehicle.specification}
                </div>

                <h3 className="text-indigo-800 text-lg font-bold mb-1 mt-6 flex justify-left ">
                  Price
                </h3>
                <div className="flex justify-left items-center">
                  {vehicle.price_per_day} SGD / Day
                </div>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className="bg-white p-8 rounded-lg shadow-md justify-center items-center">
                <Calendar
                  range
                  rangeHover
                  fixMainPosition="true"
                  value={dates}
                  format="DD/MM/YYYY"
                  onChange={setDates}
                  minDate={moment().toDate()}
                  plugins={[<DatePanel sort="date" position="bottom" />]}
                />
                <PopUp vehicle={vehicle} dates={dates}/>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default VehiclePage;