import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock([
  {
    url: "/admin/categories/:id",
    method: "GET",
    body: ({ params }) => ({
      id: Number(params.id),
      name: "Services",
      isActive: false,
    }),
  },
]);
