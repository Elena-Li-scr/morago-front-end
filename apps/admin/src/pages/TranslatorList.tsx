import { IoMdArrowDropdown } from "react-icons/io";
import {
  translatorListMock,
  translatorTableConfig,
  type Translator,
} from "../constans/constans";

export default function TranslatorList() {
  return (
    <div className="container">
      <div className="users">
        {/* Хедер таблицы */}
        <div className="table-header">
          {translatorTableConfig.columns.map((col) => (
            <div
              className={`${col.key !== "select" && "table-item"}`}
              key={col.key}
              style={{ width: col.width, marginLeft: col.marginLeft }}
            >
              {col.renderHeader ? col.renderHeader() : col.title}
              <div className="table-row-icon">
                {!col.renderHeader && col.key !== "eye" && (
                  <IoMdArrowDropdown
                    style={{ fontSize: "24px", marginLeft: "10px" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Строки данных */}
        {translatorListMock.map((row) => (
          <div className="table-row" key={row.id}>
            {translatorTableConfig.columns.map((col) => (
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
                {col.render
                  ? col.render(row)
                  : row[col.key as keyof Translator]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
