import { User } from "../../models/user";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/format";

interface UserTableProps {
  users: User[];
  selectedUsers: User[];
  handleSelect: (user: User) => void;
  handleSelectAll: () => void;
}

export default function UserTable({
  users,
  selectedUsers,
  handleSelect,
  handleSelectAll,
}: UserTableProps) {
  const { user } = useContext(AuthContext);

  return (
    <table className="table table-striped">
      <thead>
        <tr className="align-middle">
          <th>
            <input
              type="checkbox"
              className="form-check-input"
              style={{ cursor: "pointer" }}
              onChange={handleSelectAll}
            />
          </th>
          <th>
            <span>Name</span> <br />
            <span className="fw-normal">Position</span>
          </th>
          <th>Email</th>
          <th>Last Login</th>
          <th>Registration Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          const disableClass = u.status === "Blocked" ? "text-muted" : "";
          return (
            <tr className="align-middle" key={u.id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  style={{ cursor: "pointer" }}
                  disabled={u.id === user?.id}
                  onChange={() => handleSelect(u)}
                  checked={selectedUsers.includes(u)}
                />
              </td>
              <td className={disableClass}>
                <h6>{u.name}</h6>
                <span>{u.position || "-"}</span>
              </td>
              <td className={disableClass}>{u.email}</td>
              <td className={`small ${disableClass}`}>
                {u.last_login ? formatDate(u.last_login) : "-"}
              </td>
              <td className={`small ${disableClass}`}>
                {u.registration_time ? formatDate(u.registration_time) : "-"}
              </td>
              <td className={disableClass}>{u.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
