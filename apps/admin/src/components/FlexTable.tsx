import { IoMdArrowDropdown } from "react-icons/io";
import type { Column } from "../types/types";

type WithId = { id: string };

type Props<T> = {
  data: T[];
  columns: Column<any>[];
  rowKey?: (row: T) => string;
  tableType: string;
};

export default function FlexTable<T extends WithId>({
  data,
  columns,
  rowKey,
  tableType,
}: Props<T>) {
  const getKey = (r: T) => (rowKey ? rowKey(r) : String(r.id));

  return (
    <div className="table">
      {/* Хедер таблицы */}
      <div className="table-header">
        {columns.map((col) => (
          <div
            className={`${col.key !== "select" && "table-item"}`}
            key={String(col.key)}
            style={{ width: col.width, marginLeft: col.marginLeft }}
          >
            {col.renderHeader ? col.renderHeader() : <p className="col-text">{col.title}</p>}
            <span>
              {!col.renderHeader && col.key !== "eye" && (
                <IoMdArrowDropdown
                  style={{
                    fontSize: "24px",
                    ...(tableType === "translator" && { marginLeft: "10px" }),
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
      {/* Строки данных */}
      {data ? (
        <div>
          {data.map((row) => (
            <div className="table-row" key={getKey(row)}>
              {columns.map((col) => (
                <div
                  className={`${
                    col.key !== "select" &&
                    col.key !== "depositRequest" &&
                    col.key !== "status" &&
                    col.key !== "withdrawRequest" &&
                    "table-item"
                  }`}
                  key={String(col.key)}
                  style={{ width: col.width, marginLeft: col.marginLeft }}
                >
                  {col.render ? (
                    col.render(row)
                  ) : (
                    <p>{row[col.key as keyof T] as React.ReactNode}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
