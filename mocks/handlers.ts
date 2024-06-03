import { LoginReq } from "@/api/user"
import { createSuccRes, createFailRes } from "@/api/utils"
import { http, graphql, HttpResponse } from "msw"

function sleep(duration: number) {
  return new Promise(res => setTimeout(res, duration))
}

export const handlers = [
  http.post<never, LoginReq>("/api/signin", async ({ request }) => {
    await sleep(1500)

    const body = await request.json()
    if (body.username !== "clover")
      return HttpResponse.json(createFailRes("403", "user not find"))
    if (body.password !== "admin")
      return HttpResponse.json(createFailRes("403", "password error"))

    return HttpResponse.json(createSuccRes())
  }),
  graphql.query("ListMovies", () => {
    return HttpResponse.json({
      data: {
        movies: [
          {
            id: "6c6dba95-e027-4fe2-acab-e8c155a7f0ff",
            title: "The Lord of The Rings",
          },
          {
            id: "a2ae7712-75a7-47bb-82a9-8ed668e00fe3",
            title: "The Matrix",
          },
          {
            id: "916fa462-3903-4656-9e76-3f182b37c56f",
            title: "Star Wars: The Empire Strikes Back",
          },
        ],
      },
    })
  }),
]
