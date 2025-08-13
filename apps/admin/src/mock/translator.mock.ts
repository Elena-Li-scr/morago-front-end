import { defineMock } from "vite-plugin-mock-dev-server";

export default defineMock([
  {
    url: "/admin/translators/:id",
    method: "GET",
    body: ({ params }) => ({
      id: Number(params.id),
      firstName: "Minjun",
      lastName: "Kim",
      phone: "+82 10-9876-5432",
      email: "minjun.kim@example.com",
      isOnline: true,
      levelOfKorean: 5,
      dateOfBirth: "1996-04-12",
      hasWithdrawalRequest: true,
    }),
  },
]);
