import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Event from "./Pages/Event";
import Participants from "./Pages/Participants";
// import { useDarkMode } from "usehooks-ts";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/event/:eventid" element={<Event />} />
            <Route path="/participants/:eventid" element={<Participants />} />
            {/* <Route path="kontakt" element={<Kontakt />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
