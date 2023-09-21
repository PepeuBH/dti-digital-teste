import React, { useState } from "react";
import "./global.css";
import AppRoutes from "./routes";
import Header from "./components/Header/Header";
import RemindersList from "./components/RemindersList/RemindersList";

export default function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}
