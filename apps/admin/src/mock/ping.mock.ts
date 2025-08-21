import { defineMock } from "vite-plugin-mock-dev-server";
export default defineMock([{ url: "/admin/__mock-check", method: "GET", body: { ok: true } }]);
