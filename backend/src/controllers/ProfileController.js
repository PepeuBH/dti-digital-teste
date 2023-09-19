const connection = require("../database/connection");

module.exports = {
  //list specific Reminder
  async index(req, res) {
    const { id } = req.params;
    const lembrete = await connection("lembretes")
      .where("id", id)
      .select("*")
      .first();

    return res.json(lembrete);
  },
};
