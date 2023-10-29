import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const { eventid } = useParams();
  const [event, setEvent] = useState(null);
  const [result, setResult] = useState();
  const [state, setState] = useState({
    name: "",
    phone: "",
    age: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      "content-type": "application/JSON",
    };
    const data = {
      name: state.name,
      phone: state.phone,
      age: state.age,
    };

    return await axios
      .post(`http://localhost:3000/participate/add/${eventid}`, data, headers)
      .then((res) => {
        console.log(res.status);
        // res.status === 200) {
        setResult("success");
        console.log(res.data);
        return res.status;
        // }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 409) {
          setResult("duplicate");
          return err.response.status;
        } else {
          setResult("error");
          return err.response.status;
        }
      });
  };

  const handleNewForm = (event) => {
    setResult();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/event/${eventid}`)
      .then((res) => {
        setEvent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventid]);

  return (
    <div className="flex flex-col mt-1 justify-center items-center w-screen h-screen">
      {event ? (
        <div className="">
          <h1 className="text-red-500 ">Attend Event</h1>
          <h2>{event.name}</h2>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <section className="flex justify-center items-center w-1/2">
        <form
          className="w-full mx-auto p-4 bg-white shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          {result === "success" ? (
            <div>
              <p>{"Sign up sucsessfull. Go to loginpage to sign in."}</p>
              <fieldset className="">
                <p>Add another form?</p>
                <button onClick={handleNewForm}>New Form</button>
              </fieldset>
            </div>
          ) : result === "error" ? (
            <div>
              <p>
                {"An error occured. Please refresh your browser and try again"}
              </p>
              <fieldset className="">
                <p>Add another form?</p>
                <button onClick={handleNewForm}>New Form</button>
              </fieldset>
            </div>
          ) : result === "duplicate" ? (
            <div>
              <p>{"Looks like this is a duplicate value. Please try again"}</p>
              <fieldset className="">
                <p>Add another form?</p>
                <button onClick={handleNewForm}>New Form</button>
              </fieldset>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={state.name}
                  name="name"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-semibold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={state.age}
                  name="age"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm font-semibold mb-2"
                  htmlFor="phonenumber"
                >
                  Phonenumber
                </label>
                <input
                  type="tel"
                  value={state.phone}
                  name="phone"
                  id="phonenumber"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  value="Submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default Event;
