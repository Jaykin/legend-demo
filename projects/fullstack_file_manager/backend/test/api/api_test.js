const expect = require('chai').expect;
const fs = require('fs');
const md5 = require('md5');
const _ = require('lodash');
const request = require('request');
const md5File = require('md5-file/promise');
const CODE = require('../../app/errcode/code');
const sequelize = require('../../app/db2');

const baseUrl = 'http://localhost:3333/api';
const testFilePath = 'test/api/assets/test.txt';


const sectionService = require('../../app/model/sectionService');
const categoryService = require('../../app/model/categoryService');
const fileService = require('../../app/model/fileService');

function readStat(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function post(url, options) {
    return new Promise((resolve, reject) => {
        request.post(url, options, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

function postFile(url, formData) {
    return new Promise((resolve, reject) => {
        request.post(url, {
            formData,
            json: true
        }, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

function postChunk(url, formDataCallback) {
    return new Promise((resolve, reject) => {
        const r = request.post(url, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
        const form = r.form();
        formDataCallback(form);
    });
}

function createFile(options) {
    const defaultSetings = {
        name: 'test',
        path: 'F:\\SVN\\12312312',
        ext: 'png',
        size: 1024,
        md5: 'd69a34cc70dd52def4a7fb3919c73fc3',
        brand_id: '1',
        series_id: '2',
        model_id: '3',
        type_a_id: '11',
        type_b_id: '12',
        type_c_id: '13',
        section_id: '21',
        is_open: '31',
        status: 0
    };

    const settings = _.extend({}, defaultSetings, options);

    return fileService.create(settings);
}


describe('api chunk', () => {
    beforeEach((done) => {
        const section = sequelize.model('section');
        const file = sequelize.model('file');
        const category = sequelize.model('category');
        const chunkFile = sequelize.model('chunk_file');
        Promise
            .all([
                section.truncate(),
                file.truncate(),
                category.truncate(),
                chunkFile.truncate()
            ])
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });

    function openChunkStream(options) {
        const defaultSetings = {
            name: 'test',
            ext: 'txt',
        };

        return readStat(testFilePath)
            .then((data) => {
                return md5File(testFilePath)
                    .then((md5) => {
                        const finallData = _.extend({},
                            defaultSetings,
                            options, {
                                md5,
                                size: data.size,
                            }
                        );
                        return Promise.resolve(finallData);
                    });
            })
            .then((formData) => {
                return post(`${baseUrl}/chunk/open`, {
                    form: formData,
                    json: true
                });
            });
    }

    function postChunks(size) {
        const chunkSize = 10;
        let from = 0;
        let end = chunkSize - 1;
        let promiseChain = Promise.resolve();
        const chunks = Math.ceil(size / chunkSize);
        const chunksHash = [];
        // chunks 3
        for (let i = 0; i < chunks; i++) {
            const innerI = i;
            promiseChain = promiseChain.then(() => {
                from = chunkSize * innerI;
                if (from + chunkSize > size) {
                    end = size - 1;
                } else {
                    end = from + chunkSize - 1;
                }

                const stream = fs.createReadStream(testFilePath, {
                    start: from,
                    end
                });


                const innerPromise = new Promise((resolve, reject) => {
                    stream.on('data', (chunk) => {
                        const hash = md5(chunk);
                        chunksHash.push(hash);
                        resolve({
                            chunk,
                            hash
                        });
                    });
                });

                return innerPromise.then(({
                    chunk,
                    hash
                }) => {
                    return postChunk(`${baseUrl}/chunk/upload`, (form) => {
                        form.append('file_id', 1);
                        form.append('chunk', innerI);
                        form.append('md5', hash);
                        form.append('file', chunk, {
                            filename: 'test.txt'
                        });
                    });
                });
            });
        }
        return promiseChain.then(() => {
            return Promise.resolve(chunksHash);
        });
    }
    it('should create a processing file record', (done) => {
        openChunkStream()
            .then((body) => {
                expect(body.data.id).equal(1);
                done();
            });
    });

    it('should upload chunk', (done) => {
        openChunkStream()
            .then(() => {
                return readStat(testFilePath);
            })
            .then((data) => {
                const size = data.size;
                return postChunks(size);
            })
            .then((chunksHash) => {
                return post(`${baseUrl}/chunk/close`, {
                    body: {
                        file_id: 1,
                        chunks: chunksHash
                    },
                    json: true
                });
            })
            .then((body) => {
                expect(body.errcode).eql(0);
                done();
            });
    });

    it('should return err while md5 invalid ', (done) => {
        openChunkStream()
            .then(() => {
                return readStat(testFilePath);
            })
            .then((data) => {
                const stream = fs.createReadStream(testFilePath, {
                    start: 0,
                    end: 9
                });

                const innerPromise = new Promise((resolve, reject) => {
                    stream.on('data', (chunk) => {
                        const hash = md5(chunk);
                        resolve({
                            chunk,
                            hash
                        });
                    });
                });

                return innerPromise.then(({
                    chunk,
                    hash
                }) => {
                    return postChunk(`${baseUrl}/chunk/upload`, (form) => {
                        form.append('file_id', 1);
                        form.append('chunk', 0);
                        form.append('md5', 'asdfasdfasdf');
                        form.append('file', chunk, {
                            filename: 'test.txt'
                        });
                    });
                });
            })
            .then((body) => {
                const bodyJSON = JSON.parse(body);
                expect(bodyJSON.errcode).equal(CODE.CHUNK_MD5_INVALID);
                done();
            });
    });


    it('should target, src md5 match', (done) => {
        openChunkStream()
            .then(() => {
                return readStat(testFilePath);
            })
            .then((data) => {
                const size = data.size;
                return postChunks(size);
            })
            .then((chunksHash) => {
                return post(`${baseUrl}/chunk/close`, {
                    body: {
                        file_id: 1,
                        chunks: chunksHash
                    },
                    json: true
                });
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                return Promise.all([md5File(file.path), md5File(testFilePath)]);
            })
            .then(([targetFileMd5, srcFileMd5]) => {
                expect(targetFileMd5).equal(srcFileMd5);
                done();
            });
    });


    it('should clear chunks after success close chunk ', (done) => {
        openChunkStream()
            .then(() => {
                return readStat(testFilePath);
            })
            .then((data) => {
                const size = data.size;
                return postChunks(size);
            })
            .then((chunksHash) => {
                return post(`${baseUrl}/chunk/close`, {
                    body: {
                        file_id: 1,
                        chunks: chunksHash
                    },
                    json: true
                });
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    fs.readdir('./upload/chunktmp', (err, files) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(files);
                        }
                    });
                });
            })
            .then((files) => {
                expect(files.length).equal(0);
                done();
            });
    });

    // it('should change deleted file status to 0 while upload the same file', (done) => {
    //     let chunksHashTmp;
    //     openChunkStream()
    //         .then((data) => {
    //             return readStat(testFilePath);
    //         })
    //         .then((data) => {
    //             const size = data.size;
    //             return postChunks(size);
    //         })
    //         .then((chunksHash) => {
    //             chunksHashTmp = chunksHash;
    //             return post(`${baseUrl}/chunk/close`, {
    //                 body: {
    //                     file_id: 1,
    //                     chunks: chunksHash
    //                 },
    //                 json: true
    //             });
    //         })
    //         .then(() => {
    //             return fileService.updateDel(1, 1);
    //         })
    //         .then(() => {
    //             return openChunkStream();
    //         })
    //         .then((data) => {
    //             expect(data.errcode).equal(CODE.FILE_DELETED);
    //             return post(`${baseUrl}/chunk/close`, {
    //                 body: {
    //                     file_id: 1,
    //                     chunks: chunksHashTmp
    //                 },
    //                 json: true
    //             });
    //         })
    //         .then(() => {
    //             return fileService.findById(1);
    //         })
    //         .then((file) => {
    //             expect(file.status).equal(0);
    //             done();
    //         });
    // });

    it('should set delete file while open request has duplicate_id', (done) => {
        createFile()
            .then(() => {
                return openChunkStream({
                    duplicate_id: 1
                });
            })
            .then(() => {
                return fileService.findByIdWithAllStatus(1);
            })
            .then((files) => {
                expect(files.status).equal(1);
                done();
            });
    });

    it('should create baseInfo while chunk open', (done) => {
        sectionService.create({
            name: 'test',
            description: 'test descss'
        })
            .then(() => {
                return categoryService.createMulti([{
                    name: 'test-cate1',
                    description: 'cate-desc',
                    children: [{
                        name: 'test-cate2',
                        description: 'cate-desc',
                        children: [{
                            name: 'test-cate3',
                            description: 'cate-desc',
                        }]
                    }]
                }]);
            }).then(() => {
                return openChunkStream({
                    brand_id: 155,
                    series_id: 1324,
                    model_id: 19214,
                    section_id: 1,
                    type_ids: '1,2,3',
                    is_open: 1,
                    description: 'ceshi',
                });
            }).then(() => {
                return fileService.findByIdWithAllStatus(1);
            }).then((file) => {
                expect(file.brand_name).equal('斯达泰克');
                expect(file.series_name).equal('斯达泰克-卫士');
                expect(file.model_name).equal('2015款 2.2T 90');
                expect(file.section_name).equal('test');
                expect(file.type_a_name).equal('test-cate1');
                expect(file.type_b_name).equal('test-cate2');
                expect(file.type_c_name).equal('test-cate3');
                expect(file.is_open).equal(true);
                expect(file.status).equal(2);
                done();
            });
    });


    it('should update baseInfo while chunk close', (done) => {
        sectionService
            .create({
                name: 'test',
                description: 'test descss'
            })
            .then(() => {
                return categoryService.createMulti([{
                    name: 'test-cate1',
                    description: 'cate-desc',
                    children: [{
                        name: 'test-cate2',
                        description: 'cate-desc',
                        children: [{
                            name: 'test-cate3',
                            description: 'cate-desc',
                        }]
                    }]
                }]);
            }).then(() => {
                return openChunkStream({
                    brand_id: 155,
                    series_id: 1324,
                    model_id: 19214
                });
            }).then(() => {
                return fileService.updateDel(1, 1);
            }).then((file) => {
                return post(`${baseUrl}/chunk/close`, {
                    body: {
                        file_id: 1,
                        chunks: [],
                        brand_id: 155,
                        series_id: 1324,
                        model_id: 19214,
                        section_id: 1,
                        type_ids: '1,2,3',
                        is_open: 1,
                        name: 'test',
                        ext: 'txt',
                        description: 'ceshi',
                    },
                    json: true
                });
            }).then(() => {
                return fileService.findByIdWithAllStatus(1);
            }).then((file) => {
                expect(file.brand_name).equal('斯达泰克');
                expect(file.series_name).equal('斯达泰克-卫士');
                expect(file.model_name).equal('2015款 2.2T 90');
                expect(file.section_name).equal('test');
                expect(file.type_a_name).equal('test-cate1');
                expect(file.type_b_name).equal('test-cate2');
                expect(file.type_c_name).equal('test-cate3');
                expect(file.is_open).equal(true);
                expect(file.status).equal(0);
                done();
            });
    });
});


describe('api file', () => {
    beforeEach((done) => {
        const section = sequelize.model('section');
        const file = sequelize.model('file');
        const category = sequelize.model('category');
        const chunkFile = sequelize.model('chunk_file');
        Promise
            .all([
                section.truncate(),
                file.truncate(),
                category.truncate(),
                chunkFile.truncate()
            ])
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });

    it('should find duplicate before upload file', (done) => {
        const createSection = sectionService.create({
            name: 'section1'
        });
        const createCate = categoryService.create({
            name: 'cate1'
        });

        function createFile() {
            return postFile(`${baseUrl}/file/upload`, {
                file: fs.createReadStream(testFilePath),
                file_name: 'test',
                ext: 'txt',
                brand_id: 155,
                series_id: 1324,
                model_id: 19214,
                section_id: 1,
                type_ids: '1',
                is_open: 1
            });
        }

        Promise
            .all([createSection, createCate])
            .then(() => {
                return createFile();
            })
            .then(() => {
                return createFile();
            })
            .then((data) => {
                expect(data.errcode).equal(CODE.FILE_ALL_SAME);
                done();
            });
    });

    it('should auto add section cate info while file', (done) => {
        const createSection = sectionService.create({
            name: 'section1'
        });
        const createCate = categoryService.create({
            name: 'cate1'
        });

        function createFile() {
            return postFile(`${baseUrl}/file/upload`, {
                file: fs.createReadStream(testFilePath),
                file_name: 'test',
                ext: 'txt',
                brand_id: 155,
                series_id: 1324,
                model_id: 19214,
                section_id: 1,
                type_ids: '1',
                is_open: 1
            });
        }

        Promise
            .all([createSection, createCate])
            .then(() => {
                return createFile();
            })
            .then((data) => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.section_name).equal('section1');
                expect(file.type_a_name).equal('cate1');
                done();
            });
    });

    it('should update file while duplicate', (done) => {
        const createSection = sectionService.create({
            name: 'section1'
        });
        const createCate = categoryService.create({
            name: 'cate1'
        });

        function createFile(url, options) {
            const defaultSettings = {
                file: fs.createReadStream(testFilePath),
                name: 'test',
                ext: 'txt',
                brand_id: 155,
                series_id: 1324,
                model_id: 19214,
                section_id: 1,
                type_ids: '1',
                is_open: 1
            };

            const postData = _.extend({}, defaultSettings, options);

            return postFile(url, postData);
        }

        Promise
            .all([createSection, createCate])
            .then(() => {
                return createFile(`${baseUrl}/file/upload`);
            })
            .then(() => {
                return createFile(`${baseUrl}/file/replace`, {
                    file_id: 1,
                    name: 'update'
                });
            })
            .then((data) => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.name).equal('update');
                done();
            });
    });

    it('should update file while update ', (done) => {
        const createSection = sectionService.create({
            name: 'section1'
        });
        const createCate = categoryService.create({
            name: 'cate1'
        });

        function createFile(url, options) {
            const defaultSettings = {
                file: fs.createReadStream(testFilePath),
                name: 'test',
                ext: 'txt',
                brand_id: 155,
                series_id: 1324,
                model_id: 19214,
                section_id: 1,
                type_ids: '1',
                is_open: 1
            };

            const postData = _.extend({}, defaultSettings, options);

            return postFile(url, postData);
        }

        function updateFile(url, options) {
            const defaultSettings = {
                name: 'test',
                ext: 'txt',
                brand_id: 155,
                series_id: 1324,
                model_id: 19214,
                section_id: 1,
                type_ids: '1',
                is_open: 1
            };

            const postData = _.extend({}, defaultSettings, options);

            return post(url, {
                body: postData,
                json: true
            });
        }

        Promise
            .all([createSection, createCate])
            .then(() => {
                return createFile(`${baseUrl}/file/upload`);
            })
            .then(() => {
                return updateFile(`${baseUrl}/file/update`, {
                    id: 1,
                    name: 'update'
                });
            })
            .then((data) => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.name).equal('update');
                done();
            });
    });
});
