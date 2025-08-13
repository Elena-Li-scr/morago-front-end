import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock([
  {
    url: "/admin/themes/:id",
    method: "GET",
    body: ({ params }) => ({
      id: Number(params.id),
      name: "Hospital",
      isActive: true,
      iconId: 3,
      categoryId: 10,
      isPopular: true,
    }),
  },
]);
