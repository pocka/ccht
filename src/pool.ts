/**
 * Fixed size generic pool.
 */
export class Pool<T> {
  #destroyed: boolean = false;
  #takeQueue: (() => void)[] = [];
  #pool: T[];

  /**
   * Use Pool.make instead.
   */
  constructor(pool: T[]) {
    this.#pool = pool;
  }

  /**
   * Borrows a resource from pool. Fulfills when the resource is ready.
   */
  async take(): Promise<T> {
    if (this.#destroyed) {
      return Promise.reject(new Error("Pool is destroyed"));
    }

    const free = this.#pool.shift();

    if (typeof free !== "undefined") {
      return free;
    }

    return new Promise((resolve, reject) => {
      this.#takeQueue.push(() => {
        if (this.#destroyed) {
          reject(new Error("Pool is destroyed"));
          return;
        }

        resolve(this.#pool.shift()!);
      });
    });
  }

  async release(item: T) {
    if (this.#destroyed) {
      return;
    }

    this.#pool.push(item);

    this.#takeQueue.shift()?.();
  }

  destroy() {
    this.#destroyed = true;

    this.#pool.length = 0;

    this.#takeQueue.forEach((fn) => fn());
    this.#takeQueue.length = 0;
  }

  /**
   * Create a pool.
   */
  static async make<T>(
    factory: () => Promise<T>,
    size: number
  ): Promise<Pool<T>> {
    return new Pool(
      await Promise.all(Array.from({ length: size }).map(() => factory()))
    );
  }
}
