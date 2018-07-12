const sql = require("mssql");
const connString = require("../connstring");
const conn = sql.connect(connString);

const SELECT = `SELECT TOP 20 description, isCompleted, dueDate, creationDate, completedDate, completedByContactId FROM BE2_Tasks t WHERE OrganizationId = 189272 and description != '' `;

module.exports = {
  Query: {
    async allTasks(root, args, context, ast) {
      let pool = await conn;
      let query = SELECT;

      if (args.description_like) {
        query += " AND Description LIKE '%" + args.description_like + "%' ";
      }
      if (args.withComments) {
        query +=
          " AND EXISTS ( SELECT 0 FROM BE2_TaskComments tc JOIN BE2_TaskCommentResources tcr ON tc.Id = tcr.CommentId WHERE tc.TaskId = t.Id ) ";
      }
      if (args.withAttachments) {
        query += " AND EXISTS ( SELECT 0 FROM BE2_TaskResources tr WHERE tr.TaskId = t.Id ) ";
      }

      let result = await pool.request().query(`${query} ORDER BY Description`);
      return result.recordsets[0];
    }
  }
};
