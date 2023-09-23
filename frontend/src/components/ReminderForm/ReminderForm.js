import React, { useState } from "react";
import api from "../../services/api";
import "./style.css";

export default function ReminderForm() {
  const [minDate, setMinDate] = useState(getTodayDate()); //define a menor data como a data atual

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");

  async function handleSubmit(e) {
    const formData = {
      descricao,
      data,
    };

    try {
      const response = await api.post("lembretes", formData);

      // alert(`Lembrete Criado! ID: ${response.data.id}`); //!OPCIONAL! DEMORA MUITO PARA TESTAR CRIANDO VÁRIOS LEMBRETES
    } catch (err) {
      alert("Falha ao criar o lembrete!");
    }
  }

  return (
    <div className="reminder-form-div">
      <div className="reminder-form-wrap">
        <h2>Novo Lembrete</h2>
        <br />
        <form className="reminder-form" onSubmit={handleSubmit}>
          <label for="description">Descrição</label>
          <input
            placeholder="Ex: Passear com o cachorro"
            type="textarea"
            id="descriptionInput"
            name="description"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <br />
          <label for="date">Data</label>
          <input
            type="date"
            id="dateInput"
            name="date"
            min={minDate}
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <button type="submit" className="btn-criar-lembrete">
            Criar Lembrete
          </button>
        </form>
      </div>
    </div>
  );
}
