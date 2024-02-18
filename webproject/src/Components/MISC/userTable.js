import { Card, Table } from "@themesberg/react-bootstrap";

export const UserTable = (users) => {
  const usersList = users;
  return (
    <>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Role</th>
              </tr>
            </thead>
            <tbody>
              {usersList.users.map((user) => (
                <tr key={user.Email}>
                  <td>
                    <Card.Link className="d-flex align-items-center">
                      <div className="d-block">
                        <span className="fw-bold">{user.Name}</span>
                      </div>
                    </Card.Link>
                  </td>
                  <td>{user.Email}</td>
                  <td>{user.Role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
