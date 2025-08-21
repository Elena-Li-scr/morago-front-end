import { useEffect, useState } from "react";
// import { getUser, getCategory, getTheme, getTranslator } from "@shared/services/adminApi";

import "../../assets/style/popUp.css";
import { usePopUp, type PopUpInfo } from "./usePopUp";
import { useLocation } from "react-router-dom";
import { popUpTranslatorsMock, popUpUsersMock } from "../../db/db";
// interface Props {
//   id?: number;
//   type: "user" | "translator" | "themes" | "categories";
// }

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

// type PopUpData = User | Translator | Theme | Category;

function isPerson(d: unknown): d is User | Translator {
  return typeof d === "object" && d !== null && "firstName" in d;
}
function isTranslator(d: unknown): d is Translator {
  return typeof d === "object" && d !== null && "email" in d;
}
function isTheme(d: unknown): d is Theme {
  return typeof d === "object" && d !== null && "iconId" in d;
}
function isCategory(d: unknown): d is Category {
  return typeof d === "object" && d !== null && "name" in d && !("iconId" in d);
}

export default function PopUp() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const { popUpData, setPopUpData, popUpStatus, setPopUpStatus } = usePopUp();
  const [data, setData] = useState<PopUpInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res =
          last === "user"
            ? // ? await getUser(id)
              popUpUsersMock
            : last === "translator"
              ? popUpData
              : // ? await getTranslator(id)
                // : last === "themes";

                // ? await getTheme(id)
                // : await getCategory(id);
                popUpUsersMock;

        // if (!cancelled) setData(res.data as PopUpData);
        if (res) setData(res);
      } catch (e) {
        console.log(e);
        if (!cancelled) setData(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  });

  if (!popUpData || popUpStatus === "open") return null;

  return (
    <div className="pop-up-wrapper" onClick={() => setPopUpData(null)}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <div className="pop-up-image"></div>
          <div className="pop-up-setting">
            <button type="button" className="pop-up-setting-button">
              <p>Edit</p> <img src="/assets/arrow-right.png" alt="arrow right" />
            </button>

            {last !== "user" && (
              <button type="button" className="pop-up-setting-button">
                <p>Status</p>
                <img src="/assets/setting.png" alt="setting" />
              </button>
            )}
            <div className="pop-up-content">
              <div className="pop-up-content-left">
                {data && (
                  <h4>
                    {data.firstName} {data.lastName}
                  </h4>
                )}
                {last === "translator" && (
                  <div className="translations-themes">
                    <h5>Translations:</h5>
                    <ol></ol>
                  </div>
                )}
                {last === "translator" && (
                  <div className="translations-lang">
                    <h5>Language:</h5>
                    <ol>
                      <li>Русский</li>
                      <li>Казахский</li>
                      <li>Корейский</li>
                    </ol>
                  </div>
                )}
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

                {last !== "user" && (isTheme(data) || isCategory(data)) && (
                  <div>
                    <h5>Status:</h5>
                    <p>{data.isActive ? "Active" : "Non active"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
