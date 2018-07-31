import React, { Component, Fragment } from "react";
import { Client, GraphQL, buildQuery, setDefaultClient } from "micro-graphql-react";

const client = new Client({
  endpoint: "/graphql",
  fetchOptions: { credentials: "include" }
});

setDefaultClient(client);

/* #region GraphQL_queries */

const TASK_WIDGET = ` {
  allTasks {
    id
    description
  }
}
`;

const TASK_GRID = ` {
  allTasks {
    id
    description
    dueDate
    creationDate
    completedDate
    completedByContactId
  }
}
`;

const TASK_DETAILS = ` {
  allTasks(id: 1033374) {
    id
    description
    dueDate
    creationDate
    isCompleted
    completedDate
    completedByContactId
    comments {
      id
      description
      attachments {
        id,
        fileName,
        name
      }
    }
    attachments {
      id
      fileName
      name
    }
  }
}
`;

/* #endregion GraphQL_queries */

export default class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />

        <h2>Tasks Grid</h2>
        <GraphQL query={{ tasks: buildQuery(TASK_GRID) }}>
          {({ tasks: { loading, loaded, data } }) => {
            let tasks = (data && data.allTasks) || [];

            return (
              <div>
                {loading ? <span>Loading ...</span> : null}
                <table>
                  <thead>
                    <tr>
                      <td>Desc</td>
                      <td>Due date</td>
                      <td>Created on</td>
                      <td>Completed on</td>
                      <td>Completed by</td>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.slice(8).map(t => (
                      <tr key={t.id}>
                        <td>{t.description}</td>
                        <td>{t.dueDate}</td>
                        <td>{t.creationDate}</td>
                        <td>{t.completedDate}</td>
                        <td>{t.completedByContactId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </GraphQL>

        <h2>Tasks Widget</h2>
        <GraphQL query={{ tasks: buildQuery(TASK_WIDGET) }}>
          {({ tasks: { loading, loaded, data } }) => {
            let tasks = (data && data.allTasks) || [];

            return (
              <div>
                {loading ? <span>Loading ...</span> : null}
                {tasks.slice(8).map(t => (
                  <div key={t.id}>
                    <span>Name {t.description}</span>
                  </div>
                ))}
              </div>
            );
          }}
        </GraphQL>

        <h2>Task Details</h2>
        <GraphQL query={{ taskDetails: buildQuery(TASK_DETAILS) }}>
          {({ taskDetails: { loading, loaded, data } }) => {
            let task = data && data.allTasks ? data.allTasks[0] : null;
            return (
              <div>
                {loading ? <span>Loading ...</span> : null}
                {task ? (
                  <div>
                    <div>Description: {task.description}</div>
                    <div>Is Completed: {task.isCompleted}</div>
                    {task.isCompleted ? (
                      <Fragment>
                        <div>Completed date: {task.completedDate}</div>
                        <div>Completed by: {task.completedByContactId}</div>
                      </Fragment>
                    ) : null}
                    <div>Due Date: {task.dueDate}</div>
                    <br />
                    Attachments:
                    {task.attachments.map((att, index) => (
                      <div key={att.id}>
                        <div>Filename: {att.fileName}</div>
                        <div>Name {att.name}</div>
                        <hr />
                      </div>
                    ))}
                    <br />
                    <br />
                    Comments:
                    {task.comments.map((c, index) => (
                      <div key={c.id}>
                        COMMENT {index + 1}:<br />
                        {c.description}
                        <br />
                        <hr />
                        {c.attachments.map(att => (
                          <div key={att.id}>
                            <div>Filename: {att.fileName}</div>
                            <div>Name {att.name}</div>
                          </div>
                        ))}
                        <hr />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }}
        </GraphQL>
      </div>
    );
  }
}
