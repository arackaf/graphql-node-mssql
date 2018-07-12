module.exports = `

type Task {
  description: String
  isCompleted: Int
  dueDate: String
  creationDate: String
  completedDate: String
  completedByContactId: Int
}

type Query {
  allTasks(description_like: String, withComments: Boolean, withAttachments: Boolean): [Task]
}

`;
