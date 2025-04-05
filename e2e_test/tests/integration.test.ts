// @ts-ignore
import { handler } from "../src/handler";

test("returns hello name", async () => {
  const response = await handler({
    httpMethod: "POST",
    body: JSON.stringify({ name: "Malte" }),
  } as any);

  expect(JSON.parse(response.body)).toEqual({ message: "hello Malte" });
});