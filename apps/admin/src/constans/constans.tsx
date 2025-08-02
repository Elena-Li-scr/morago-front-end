import { IoEyeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

export type Translator = {
  id: string;
  name: string;
  phone: string;
  email: string;
  topik: string;
  status: string;
  withdrawRequest?: string;
};

export type User = {
  id: string;
  name: string;
  phone: string;
  balance: string;
  depositRequest?: string;
};

// Тип одной колонки
type Column = {
  key: string;
  title?: string;
  width?: string;
  marginLeft?: string;
  renderHeader?: () => React.ReactNode;
  render?: (row: Translator | User) => React.ReactNode;
};

// Конфиг колонок
export const translatorTableConfig: { columns: Column[] } = {
  columns: [
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
        return (
          <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />
        );
      },
    },
  ],
};

// Мок-данные
export const translatorListMock: Translator[] = [
  {
    id: "1",
    name: "Name 1",
    phone: "010 1234 5678",
    email: "mail1@mail.com",
    topik: "5 level",
    status: "Verified",
    withdrawRequest: "Request",
  },
  {
    id: "2",
    name: "Name 2",
    phone: "010 2222 2222",
    email: "mail2@mail.com",
    topik: "3 level",
    status: "Unverified",
    withdrawRequest: "None",
  },
];

export const UserTableConfig: { columns: Column[] } = {
  columns: [
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
        row.phone ? (
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
        return (
          <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />
        );
      },
    },
  ],
};

export const UserListMock: User[] = [
  {
    id: "1",
    name: "Name 1",
    phone: "010 1234 5678",
    balance: "1000",
    depositRequest: "Request",
  },
  {
    id: "2",
    name: "Name 2",
    phone: "010 2222 2222",
    balance: "500",
    depositRequest: "None",
  },
];
