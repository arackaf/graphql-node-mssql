const sql = require("mssql");
const connString = require("../connstring");
const conn = sql.connect(connString);

const SELECT = `SELECT TOP 20 description, isCompleted, dueDate, creationDate, completedDate, completedByContactId FROM BE2_Tasks WHERE OrganizationId = 189272 and description != '' `;

module.exports = {
  Query: {
    async allTasks(root, args, context, ast) {
      let pool = await conn;
      let result = await pool.request().query(`${SELECT} ORDER BY Description`);
      return result.recordsets[0];
    }
  }
};
