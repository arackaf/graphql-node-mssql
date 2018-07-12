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
  allTasks: [Task]
}

`;
