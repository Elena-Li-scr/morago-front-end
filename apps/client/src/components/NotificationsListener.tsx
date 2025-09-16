// import { useEffect } from "react";
// import { getSocket } from "../lib/socket";
// import { useNoteStore } from "@shared/store/useStore";

// export default function NotificationsListener() {
//   const { setHaveNewNote } = useNoteStore();

//   useEffect(() => {
//     const socket = getSocket();

//     const onNew = () => {
//       setHaveNewNote(true);
//     };

//     if (!socket.connected) socket.connect();

//     socket.on("notification:new", onNew);

//     return () => {
//       socket.off("notification:new", onNew);
//     };
//   }, [setHaveNewNote]);

//   return null;
// }
