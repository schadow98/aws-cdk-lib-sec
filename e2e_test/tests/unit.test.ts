test("returns hello name", async () => {

  const name = "Max"
  expect("hello " + name).toEqual("hello Max");
});