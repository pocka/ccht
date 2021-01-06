import { Pool } from "./pool";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

it("should be fixed-sized", async () => {
  const id = jest.fn((x) => x);

  let i = 0;
  const pool = await Pool.make(async () => i++, 3);

  await Promise.all([
    pool.take().then(async (v) => {
      expect(v).toEqual(0);
      await wait(100);
      id(1);
      pool.release(v);
    }),
    pool.take().then(async (v) => {
      expect(v).toEqual(1);
      await wait(200);
      id(2);
      pool.release(v);
    }),
    pool.take().then(async (v) => {
      expect(v).toEqual(2);
      await wait(300);
      id(3);
      pool.release(v);
    }),
    pool.take().then(async (v) => {
      expect(v).toEqual(0);
      await wait(10);
      id(4);
      pool.release(v);
    }),
  ]);

  expect(id.mock.calls).toEqual([[1], [4], [2], [3]]);
});

it("should cancel Promise returned by take on destory", async () => {
  const pool = await Pool.make(async () => true, 1);

  const errOrResults = await Promise.all([
    pool.take(),
    pool.take(),
    wait(100).then(() => {
      pool.destroy();
    }),
  ]).catch((err) => err);

  expect(errOrResults).toBeInstanceOf(Error);
});
