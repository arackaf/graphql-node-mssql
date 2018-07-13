import React, { Component } from "react";
import { Client, GraphQL, buildQuery, setDefaultClient } from "micro-graphql-react";

const client = new Client({
  endpoint: "/graphql",
  fetchOptions: { credentials: "include" }
});

setDefaultClient(client);

/* #region GraphQL_queries */

const TASK_DETAILS = ` {
  allTasks(id: 1033374) {
    id
    description
    dueDate
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

        <GraphQL query={{ tasks: buildQuery(TASK_DETAILS) }}>
          {({ tasks: { loading, loaded, data } }) => {
            let task = data && data.allTasks ? data.allTasks[0] : null;
            return (
              <div>
                {loading ? <span>Loading ...</span> : null}
                {task ? (
                  <div>
                    <div>Description: {task.description}</div>
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
