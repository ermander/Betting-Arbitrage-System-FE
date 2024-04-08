// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Dagli env variables devo prendere il base url
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(baseUrl);

const RESOURCES = {
  baseUrl: `${baseUrl}/users/`,
  routes: {
    login: "login",
  },
};

export default async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return axios.post(`${RESOURCES.baseUrl}${RESOURCES.routes.login}`, {
    email,
    password,
  });
}
