class Hmr {
  oneCallMap: Record<string, boolean> = {};

  /**
   * hmr下只执行一次的代码
   *
   * @desc 由于函数装饰器不好拿实例，不用于多实例
   */
  oneCall: MethodDecorator = (target, propertyKey, descriptor) => {
    // not support symbol
    if (typeof propertyKey === 'symbol') {
      console.error('not support symbol');
      return descriptor;
    }

    const oldMethod = descriptor.value;
    if (typeof oldMethod !== 'function') {
      console.error('not function');
      return descriptor;
    }

    const oneCallMap = this.oneCallMap;

    descriptor.value = function (this: any, ...args: any[]) {
      const key = `${target.constructor.name}.${propertyKey}`;
      if (oneCallMap[key]) {
        return;
      }
      oneCallMap[key] = true;
      return oldMethod.apply(this, args);
    } as any;

    return descriptor;
  };
}

export const hmr = new Hmr();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
