module.exports = `

type Attachment { 
  id: Int
  fileName: String
  name: String
}

type Comment { 
  id: Int
  description: String
  attachments: [Attachment]
}

type Task {
  id: Int
  description: String
  isCompleted: Int
  dueDate: String
  creationDate: String
  completedDate: String
  completedByContactId: Int
  comments: [Comment]
  attachments: [Attachment]
}

type Query {
  allTasks(id: Int, description_like: String, withComments: Boolean, withAttachments: Boolean): [Task]
}

`;
