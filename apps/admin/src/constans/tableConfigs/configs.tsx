import { IoEyeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import type { Column, Translator, User } from "../../types/types";

// Тип одной колонки

// Конфиг колонок Translator
export const translatorTableConfig: Column<Translator>[] = [
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  { key: "name", title: "Name", width: "40%", marginLeft: "38px" },
  { key: "phone", title: "Phone", width: "35%" },
  { key: "email", title: "Email", width: "35%" },
  { key: "topik", title: "TOPIK", width: "35%" },
  { key: "status", title: "Status", width: "35%" },
  {
    key: "withdrawRequest",
    title: "Withdraw request",
    width: "35%",
    render: (row) => {
      if ("withdrawRequest" in row && row.withdrawRequest === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return <div className={`table-item`}>None</div>;
    },
  },
  {
    key: "call",
    title: "Call",
    width: "35%",
    render: (row) =>
      row.phone ? (
        <button className="view-btn">
          {" "}
          View <MdArrowForwardIos className="view-icon" />
        </button>
      ) : null,
  },
  {
    key: "withdraw",
    title: "Withdraw",
    width: "40%",
    render: (row) =>
      "withdrawRequest" in row && row.withdrawRequest ? (
        <button className="view-btn">
          {" "}
          View <MdArrowForwardIos className="view-icon" />
        </button>
      ) : null,
  },
  {
    key: "eye",
    title: "",
    render: (row) => {
      if (!row) return null;
      return <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />;
    },
  },
];

// Конфиг колонок User
export const UserTableConfig: Column<User>[] = [
  {
    key: "select",
    renderHeader: () => <input type="checkbox" className="table-check-box" />,
    render: () => <input type="checkbox" className="table-check-box" />,
  },
  { key: "name", title: "Name", width: "40%", marginLeft: "38px" },
  { key: "phone", title: "Phone", width: "35%" },
  { key: "balance", title: "Balance", width: "35%" },
  {
    key: "depositRequest",
    title: "Withdraw",
    width: "40%",
    render: (row) => {
      if ("depositRequest" in row && row.depositRequest === "Request") {
        return (
          <button className="view-btn request">
            Request <MdArrowForwardIos className="view-icon" />
          </button>
        );
      }
      return <div className={`table-item`}>None</div>;
    },
  },
  {
    key: "call",
    title: "Call",
    width: "35%",
    render: (row) =>
      row.name ? (
        <button className="view-btn">
          View <MdArrowForwardIos className="view-icon" />
        </button>
      ) : null,
  },
  {
    key: "deposit",
    title: "Deposit",
    width: "40%",
    render: (row) =>
      "depositRequest" in row && row.depositRequest ? (
        <button className="view-btn">
          View <MdArrowForwardIos className="view-icon" />
        </button>
      ) : null,
  },
  {
    key: "eye",
    title: "",
    render: (row) => {
      if (!row) return null;
      return <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />;
    },
  },
];
