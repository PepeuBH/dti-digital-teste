import React from "react";
import "./styles.css";
import Header from "../../components/Header/Header";
import ReminderForm from "../../components/ReminderForm/ReminderForm";
import RemindersList from "../../components/RemindersList/RemindersList";

export default function Reminder() {
  return (
    <div className="header-div">
      <div>
        <Header />
      </div>

      <div className="reminder-form-div">
        <ReminderForm />
      </div>

      <div className="reminder-list-div">
        <RemindersList />
      </div>
    </div>
  );
}
