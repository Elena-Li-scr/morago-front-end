// import { useEffect, useState } from "react";
// import { getUser, getCategory, getTheme, getTranslator } from "@shared/services/adminApi";

// import "../assets/style/popUp.css";
// interface Props {
//   id: string;
//   type: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   isActive: boolean;
// }

// interface Theme {
//   id: number;
//   name: string;
//   isActive: boolean;
//   iconId: number;
//   categoryId: number;
//   isPopular: boolean;
// }

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   balance: number;
//   hasDepositRequest: boolean;
// }

// interface Translator {
//   id: number;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   isOnline: boolean;
//   levelOfKorean: number;
//   dateOfBirth: string;
//   hasWithdrawalRequest: boolean;
// }

// type PopUpData = User | Translator | Theme | Category;
// export default function PopUp({ id, type }: Props) {
//   const [data, setData] = useState<PopUpData | null>(null);
//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         let res;
//         switch (type) {
//           case "user":
//             res = await getUser(id);
//             setData(res.data);
//             break;
//           case "translator":
//             res = await getTranslator(id);
//             setData(res.data);
//             break;
//           case "themes":
//             res = await getTheme(id);
//             setData(res.data);
//             break;
//           case "categories":
//             res = await getCategory(id);
//             setData(res.data);
//             break;
//           default:
//             setData(null);
//         }
//       };
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [id, type]);

//   return (
//     <div className="pop-up-wrapper">
//       <div className="pop-up">
//         <div className="pop-up-header">
//           <div className="pop-up-image">{/* <img src="" alt="image" /> */}</div>
//           <div className="pop-up-setting">
//             <button type="button" className="pop-up-setting-button">
//               <p>Edit</p> <img src="/assets/arrow-right.png" alt="arrow right" />
//             </button>
//             <button type="button" className="pop-up-setting-button">
//               <p>Status</p>
//               <img src="/assets/setting.png" alt="setting" />
//             </button>
//           </div>
//         </div>
//         <div className="pop-up-content"></div>
//       </div>
//     </div>
//   );
// }
