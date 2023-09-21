import React from "react";
import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import Reminder from "./pages/Reminders";

const AppRoutes = () =>  {
  return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Reminder/>}></Route>

            </Routes>
        </Router>
  );
}

export default AppRoutes;
