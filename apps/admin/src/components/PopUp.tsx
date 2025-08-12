import { useEffect, useState } from "react";
import { getUser, getCategory, getTheme, getTranslator } from "@shared/services/adminApi";

import "../assets/style/popUp.css";

interface Props {
  id: string;
  type: "user" | "translator" | "themes" | "categories";
}

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

interface Theme {
  id: number;
  name: string;
  isActive: boolean;
  iconId: number;
  categoryId: number;
  isPopular: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

interface Translator {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  dateOfBirth: string;
  hasWithdrawalRequest: boolean;
}

type PopUpData = User | Translator | Theme | Category;

function isPerson(d: PopUpData | null): d is User | Translator {
  return !!d && "firstName" in d;
}
function isTranslator(d: PopUpData | null): d is Translator {
  return !!d && "email" in d;
}
function isTheme(d: PopUpData | null): d is Theme {
  return !!d && "iconId" in d;
}
function isCategory(d: PopUpData | null): d is Category {
  return !!d && "name" in d && !("iconId" in d);
}

export default function PopUp({ id, type }: Props) {
  const [data, setData] = useState<PopUpData | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res =
          type === "user"
            ? await getUser(id)
            : type === "translator"
              ? await getTranslator(id)
              : type === "themes"
                ? await getTheme(id)
                : await getCategory(id);

        if (!cancelled) setData(res.data as PopUpData);
      } catch (e) {
        console.log(e);
        if (!cancelled) setData(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, type]);

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up">
        <div className="pop-up-header">
          <div className="pop-up-image">{/* <img src="" alt="image" /> */}</div>
          <div className="pop-up-setting">
            <button type="button" className="pop-up-setting-button">
              <p>Edit</p> <img src="/assets/arrow-right.png" alt="arrow right" />
            </button>
            {type !== "user" && (
              <button type="button" className="pop-up-setting-button">
                <p>Status</p>
                <img src="/assets/setting.png" alt="setting" />
              </button>
            )}
          </div>
        </div>

        <div className="pop-up-content">
          <div className="pop-up-content-left">
            <h4>{isPerson(data) ? `${data.firstName} ${data.lastName}` : ""}</h4>
            {/* Нет данных в ответе от api о доступных темах перевода и языках . Временно законментировала поле */}

            {/* {type === "translator" && (
              <div className="translations-themes">
                <h5>Translations:</h5>
                <ol>
                  {(data as Translator).}
                </ol>
              </div>
            )} */}

            {/* {type === "translator" && (
              <div className="translations-lang">
                <h5>Language:</h5>
                <ol>
                  <li>Русский</li>
                  <li>Казахский</li>
                  <li>Корейский</li>
                </ol>
              </div>
            )} */}
          </div>

          <div className="pop-up-content-right">
            {isPerson(data) && (
              <div>
                <h5>Phone:</h5>
                <p>{data.phone}</p>
              </div>
            )}

            {isTranslator(data) && (
              <>
                <div>
                  <h5>Email:</h5>
                  <p>{data.email}</p>
                </div>
                <div>
                  <h5>TOPIK:</h5>
                  <p>{data.levelOfKorean} level</p>
                </div>
                <div>
                  <h5>Birth:</h5>
                  <p>{data.dateOfBirth}</p>
                </div>
              </>
            )}

            {isTheme(data) && (
              <div>
                <h5>Category:</h5>
                <p>{data.categoryId}</p>
              </div>
            )}

            {isPerson(data) && !isTranslator(data) && (
              <div>
                <h5>Coins:</h5>
                <p>{data.balance}</p>
              </div>
            )}

            {type !== "user" && (isTheme(data) || isCategory(data)) && (
              <div>
                <h5>Status:</h5>
                <p>{data.isActive ? "Active" : "Non active"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
