const fs = require('fs');
const _ = require('lodash');
const chunkService = require('../../model/chunkFileService');
const CODE = require('../../errcode/code');
const {
    createFilePath
} = require('../../lib/fileStorage');


function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeChunkStream(stream, data) {
    return new Promise((resolve, reject) => {
        stream.write(data, () => {
            resolve();
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
}


function validateChunk(req) {
    return chunkService
        .findAllByFileId(req.body.file_id)
        .then((result) => {
            if (!req.body.file_id || !req.body.chunks) {
                console.log('fuck');
                return Promise.reject(99);
            }

            if (result.chunks.length !== req.body.chunks.length) {
                return Promise.reject(CODE.CHUNK_UNMATCH);
            }

            const fail = _.some(result.chunks, (chunk, index) => {
                return chunk.md5 !== req.body.chunks[index];
            });

            if (fail) {
                return Promise.reject(CODE.CHUNK_UNMATCH);
            }
            return createFilePath().then((path) => {
                return Promise.resolve({
                    path,
                    chunks: result.chunks,
                    file_id: result.id
                });
            });
        });
}

function combineChunks(info) {
    const {
        path,
        chunks,
        file_id
    } = info;
    const finalPath = `${path}/${Date.now()}`;
    const stream = fs.createWriteStream(finalPath);

    // 这里 stream 多次 listen 了  error
    // 由于亚欧不要改一下，需要在外面包一层 promise。
    // 或者想想其他办法。
    const maxListener = 30;
    stream.setMaxListeners(maxListener);

    const sortedChunks = chunks.sort((a, b) => {
        return a.idx - b.idx;
    });
    let promiseChain = Promise.resolve();
    _.forEach(sortedChunks, (chunk) => {
        promiseChain = promiseChain.then(() => {
            return readFilePromise(chunk.path).then((data) => {
                return writeChunkStream(stream, data);
            });
        });
    });

    return promiseChain.then(() => {
        return Promise.resolve({
            finalPath,
            file_id,
            chunks
        });
    });
}


module.exports = {
    validateChunk,
    combineChunks
};
