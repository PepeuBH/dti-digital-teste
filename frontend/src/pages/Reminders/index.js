import React from "react";
import Header from "../../components/Header/Header";
import ReminderForm from "../../components/ReminderForm/ReminderForm";
import RemindersList from "../../components/RemindersList/RemindersList";
import Footer from "../../components/Footer/Footer";

export default function Reminder() {
  return (
    <div>
      <Header />
      <ReminderForm />
      <RemindersList />
      <Footer />
    </div>
  );
}
