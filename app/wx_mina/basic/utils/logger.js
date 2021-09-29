let timestamp = 0

export function log (str) {
    const ts = +new Date;

    console.log(str, `${ts - timestamp}ms`)
    timestamp = ts
}