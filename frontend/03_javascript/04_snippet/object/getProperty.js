/**
 * 输入：
 *      const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};
 *      get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')
 * 输出：
 *      ['FE coder', 1, 'byted']
 */

function getProperty(obj, ...paths) {
    return paths.map((path) => {
        let val

        path.replace(/\[/g, '.')
            .replace(/\]/g, '')
            .split('.')
            .forEach(prop => val = val && val[prop])

        return val
    });
}