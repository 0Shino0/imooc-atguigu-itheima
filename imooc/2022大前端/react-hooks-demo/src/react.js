console.log('react hooks');
// useState useEffect
const ReactX = (() => {
  let hooks = [];

  let index = 0;

  const useState = (initialValue) => {
    const localIdx = index;
    index++;

    if (hooks[localIdx] === undefined) {
      hooks[localIdx] = initialValue;
    }
    const setterFunc = (newval) => {
      hooks[localIdx] = newval;
    };
    return [hooks[localIdx], setterFunc];
  };

  const resetIndex = () => {
    index = 0;
  };

  const useEffect = (callback, deps) => {
    let hasChanged = true;

    const oldDeps = hooks[index];
    // 不存在 -> 直接执行callback
    // 存在 -> 比对新旧deps -> 变化的情况下才去执行callback
    if (oldDeps) {
      // [] -> 不执行callback
      hasChanged = false;

      // [deps] 有数据的情况下进行比对
      deps.forEach((dep, i) => {
        const oldDep = oldDeps[i];
        const areTheSame = Object.is(dep, oldDep);
        if (!areTheSame) {
          hasChanged = true;
        }
      });
    }

    if (hasChanged) {
      callback();
    }

    hooks[index] = deps;
    index++;
  };

  return {
    useState,
    resetIndex,
    useEffect,
  };
})();

const { useState, resetIndex, useEffect } = ReactX;

const Component = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('react');

  console.log(count);

  useEffect(() => {
    console.log('useEffect');
  }, [name]);

  if (count !== 1) {
    setCount(1);
  }

  if (name !== 'hooks' && count === 1) {
    setName('hooks');
  }
};

// 模拟JSX的render渲染方法
Component();
resetIndex();
Component();
resetIndex();
Component();
