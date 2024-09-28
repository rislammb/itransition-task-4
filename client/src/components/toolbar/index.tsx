import { TbLock, TbLockOpen2, TbTrash } from "react-icons/tb";
import { User } from "../../models/user";
import IconButton from "../shared/icon-button";

interface ToolbarProps {
  selectedUsers: User[];
  handleBlock: () => void;
  handleUnblock: () => void;
  handleDelete: () => void;
}

export default function Toolbar({
  selectedUsers,
  handleBlock,
  handleUnblock,
  handleDelete,
}: ToolbarProps) {
  return (
    <div className="d-flex gap-3 align-items-center">
      <IconButton
        className="btn-outline-secondary"
        disabled={
          selectedUsers.length === 0 ||
          selectedUsers.every((u) => u.status === "Blocked")
        }
        onClick={handleBlock}
      >
        <TbLock size={"24px"} /> Block
      </IconButton>
      <IconButton
        className="btn-outline-secondary"
        onClick={handleUnblock}
        disabled={
          selectedUsers.length === 0 ||
          selectedUsers.every((u) => u.status === "Active")
        }
      >
        <TbLockOpen2 title="Unblock" size={"24px"} />
      </IconButton>
      <IconButton
        className="btn-danger"
        onClick={handleDelete}
        disabled={selectedUsers.length === 0}
      >
        <TbTrash title="Delete" size={"24px"} />
      </IconButton>
    </div>
  );
}
