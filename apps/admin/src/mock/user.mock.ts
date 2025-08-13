import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock([
  {
    url: "/admin/users/:id",
    method: "GET",
    body: ({ params }) => ({
      id: Number(params.id),
      firstName: "Jane",
      lastName: "Doe",
      phone: "+82 10-1234-5678",
      balance: 1200,
      hasDepositRequest: false,
    }),
  },
]);
