import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./style.css";

const RemindersList = () => {
  const [lembretes, setLembretes] = useState([]);

  useEffect(() => {
    api.get("lembretes").then((response) => {
      setLembretes(response.data);
    });
  }, []);

  const agruparLembretesPorData = (lembretes) => {
    const lembretesAgrupados = {};

    lembretes.forEach((lembrete) => {
      const { id, descricao, data } = lembrete;

      if (!lembretesAgrupados[data]) {
        lembretesAgrupados[data] = [];
      }

      lembretesAgrupados[data].push({ id, descricao });
    });

    return lembretesAgrupados;
  };

  const handleExcluirLembrete = async (id) => {
    try {
      await api.delete(`lembretes/${id}`);
      const novosLembretes = lembretes.filter((lembrete) => lembrete.id !== id);
      setLembretes(novosLembretes);
    } catch (error) {
      alert("Erro ao excluir lembrete:", error);
    }
  };

  const lembretesAgrupadosPorData = agruparLembretesPorData(lembretes);

  const datasOrdenadas = Object.keys(lembretesAgrupadosPorData) //ORDENAR DATAS CRONOLOGICAMENTE
    .map((data) => new Date(data))
    .sort((a, b) => a - b);

  function converterDataISOparaPadraoBrasileiro(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="reminder-list-div">
      <div className="reminder-list-container">
        <h1>Meus Lembretes</h1>
        {datasOrdenadas.map((data) => {
          const dataISO = data.toISOString().split("T")[0];
          const dataPadraoBrasileiro = converterDataISOparaPadraoBrasileiro(dataISO);
          
          return (
            <div key={dataPadraoBrasileiro}>
              <h2>{dataPadraoBrasileiro}</h2>
              <ul>
                {lembretesAgrupadosPorData[dataISO].map((lembrete) => (
                  <li key={lembrete.id}>
                    {lembrete.descricao}
                    <button
                      onClick={() => handleExcluirLembrete(lembrete.id)}
                      type="button"
                    >
                      <FiTrash2 size={20} stroke="#E02041" fill="none" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RemindersList;
