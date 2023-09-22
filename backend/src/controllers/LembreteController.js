const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  //Create a reminder
  async create(req, res) {
    const { descricao, data } = req.body;

    const id = crypto.randomBytes(4).toString("HEX"); //cria id aleatório em hexadecimal

    await connection("lembretes").insert({
      id,
      descricao,
      data,
    });

    return res.json({ id });
  },


  //List all reminders
  async index(req, res) {
    const { page = 1 } = req.query; //paginação

    const [count] = await connection("lembretes").count(); //contador total de lembretes

    const lembretes = await connection("lembretes")
      // .limit(5)
      // .offset((page - 1) * 5)
      .select("*");

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(lembretes);
  },


  //Delete a reminder
  async delete(req, res) {
    const { id } = req.params;

    const lembrete = await connection("lembretes")
      .where("id", id)
      .select("id")
      .first();

    if (lembrete.id != id) {
      return res
        .status(400)
        .json({ error: "Theres was an error during the action!" });
    }

    await connection("lembretes").where("id", id).delete();

    return res.status(204).send();
  },
};
