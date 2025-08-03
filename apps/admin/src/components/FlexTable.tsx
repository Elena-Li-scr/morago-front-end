import { IoMdArrowDropdown } from "react-icons/io";
import type { Column } from "../types/types";

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  type: string;
};

export default function FlexTable<T>({
  data,
  columns,
  rowKey,
  type,
}: Props<T>) {
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
            {col.renderHeader ? col.renderHeader() : col.title}
            <span>
              {!col.renderHeader && col.key !== "eye" && (
                <IoMdArrowDropdown
                  style={{
                    fontSize: "24px",
                    ...(type === "translator" && { marginLeft: "10px" }),
                  }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
      {/* Строки данных */}
      {data.map((row) => (
        <div className="table-row" key={rowKey(row)}>
          {columns.map((col) => (
            <div
              className={`${
                col.key !== "select" &&
                col.key !== "depositRequest" &&
                col.key !== "withdrawRequest" &&
                "table-item"
              }`}
              key={String(col.key)}
              style={{ width: col.width, marginLeft: col.marginLeft }}
            >
              {col.render
                ? col.render(row)
                : (row[col.key as keyof T] as React.ReactNode)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
