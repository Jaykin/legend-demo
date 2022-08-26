let deps = {
  "a.js": {
    deps: ["b.js", "e.js"],
  },
  "b.js": {
    deps: ["c.js"],
  },
  "c.js": {
    deps: ["d.js"],
  },
  "d.js": {
    deps: ["a.js"],
  },
};

function checkCyclicRequire(deps) {
  return Object.entries(deps).map(([jsPath]) => {
    return checkCyclic(jsPath, [], deps);
  });
}

function checkCyclic(jsPath, depsChains, deps) {
  console.log(jsPath, depsChains);

  // 已有的依赖链中是否存在
  if (depsChains.includes(jsPath)) {
    return [["cyclic", ...depsChains, jsPath]];
  }

  // 递归
  if (jsPath in deps) {
    return deps[jsPath].deps
      .map((path) => checkCyclic(path, [...depsChains, jsPath], deps))
      .flat(1);
  }

  return [["noCyclic", ...depsChains, jsPath]];
}

console.log(checkCyclicRequire(deps));
