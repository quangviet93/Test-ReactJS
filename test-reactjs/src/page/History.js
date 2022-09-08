import React from "react";
import NavBar from "../Component/NavBar";
import { useSelector, useDispatch } from "react-redux";

function History() {
  const userList = useSelector((state) => state.users.value);
  const results = useSelector((state) => state.result);
  const answers = useSelector((state) => state.answer);

  return (
    <div className="screenGameManagement">
      <NavBar />
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Answer</th>
                <th>Result</th>
              </tr>
              {userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <th>{user.name}</th>
                    <div>
                      {answers.map((answer) => {
                        if (answer.name === user.name) {
                          return <th>{String(answer.value)}</th>;
                        }
                      })}
                    </div>
                    <div>
                      {results.map((result) => {
                        return <th>{String(result.value)}</th>;
                      })}
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
