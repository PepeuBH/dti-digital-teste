import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FiTrash2 } from "react-icons/fi";

const RemindersList = () => {
  const [lembretes, setLembretes] = useState([]);
  useEffect(() => {
    api.get("lembretes").then((response) => {
      setLembretes(response.data);
    });
  }, []);


  async function handleDeleteReminder(id){
    try{
        await api.delete(`lembretes/${id}`)

    setLembretes(lembretes.filter(lembrete => lembrete.id != id))
    }catch(err){
        alert('Erro ao excluir o lembrete!')
    }
  }

  return (
    <div className="reminder-list-container">
      <h1>Meus Lembretes</h1>
      <ul>
        {lembretes.map((lembrete) => (
          <li key={lembrete.id}>
            <p>
              <span className="reminder-date-span">Data: </span>
              {Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(
                lembrete.value
              )}
            </p>

            <p className="reminder-description-field"><span className="reminder-description-span">Lembrete: </span>{lembrete.descricao}</p>
            <button onClick={() => handleDeleteReminder(lembrete.id)} type="button">
              <FiTrash2 size={20} stroke="#E02041" fill="none" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemindersList;
