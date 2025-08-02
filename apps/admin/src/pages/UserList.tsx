import { IoMdArrowDropdown } from "react-icons/io";
import { UserListMock, UserTableConfig, type User } from "../constans/constans";
import { MdArrowForwardIos } from "react-icons/md";

export default function UserList() {
  return (
    <div className="container">
      <div className="users">
        {/* Хедер таблицы */}
        <div className="table-header">
          {UserTableConfig.columns.map((col) => (
            <div
              className={`${col.key !== "select" && "table-item"}`}
              key={col.key}
              style={{ width: col.width, marginLeft: col.marginLeft }}
            >
              {col.renderHeader ? col.renderHeader() : col.title}
              <span>
                {!col.renderHeader && col.key !== "eye" && (
                  <IoMdArrowDropdown style={{ fontSize: "24px" }} />
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Строки данных */}
        {UserListMock.map((row) => (
          <div className="table-row" key={row.id}>
            {UserTableConfig.columns.map((col) => (
              <div
                className={`${
                  col.key !== "select" &&
                  col.key !== "depositRequest" &&
                  col.key !== "withdrawRequest" &&
                  "table-item"
                }`}
                key={col.key}
                style={{ width: col.width, marginLeft: col.marginLeft }}
              >
                {col.render ? col.render(row) : row[col.key as keyof User]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
