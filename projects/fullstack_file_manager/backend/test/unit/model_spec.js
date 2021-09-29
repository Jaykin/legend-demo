const expect = require('chai').expect;
const _ = require('lodash');
const sectionService = require('../../app/model/sectionService');
const categoryService = require('../../app/model/categoryService');
const fileService = require('../../app/model/fileService');
const chunkService = require('../../app/model/chunkFileService');
const sequelize = require('../../app/db2');
const brandService = require('../../app/model/brand');
const CODE = require('../../app/errcode/code');

describe('sectionService', () => {
    beforeEach((done) => {
        const section = sequelize.model('section');
        const file = sequelize.model('file');

        Promise
            .all([section.truncate(), file.truncate()])
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });


    it('should create a section', (done) => {
        sectionService.create({
            name: 'test',
            description: 'test desc'
        })
            .then((id) => {
                expect(id).to.not.equal(null);
                done();
            });
    });

    it('should not create same name section', (done) => {
        sectionService.create({
            name: 'test',
            description: 'test descss'
        })
            .then(() => {
                return sectionService.create({
                    name: 'test',
                    description: 'test descss'
                });
            }).catch((err) => {
                expect(err).to.equal(CODE.SECTION_NAME_EXIST);
                done();
            });
    });

    it('should update section', (done) => {
        sectionService
            .create({
                name: 'test',
                description: 'test descss'
            })
            .then((id) => {
                return sectionService.update({
                    id,
                    name: 'update',
                    description: 'update desc'
                });
            })
            .then(() => {
                return sectionService.findById(1);
            })
            .then((instance) => {
                expect(instance.name).to.equal('update');
                expect(instance.description).to.equal('update desc');
                done();
            });
    });

    it('should return errcode if name exist while try to update', (done) => {
        sectionService
            .create({
                name: 'test',
                description: 'test descss'
            })
            .then(() => {
                return sectionService
                    .create({
                        name: 'update',
                        description: 'update desc'
                    });
            })
            .then(() => {
                return sectionService.update({
                    id: 1,
                    name: 'update',
                    description: 'update desc'
                });
            })
            .then(() => {
                return sectionService.findById(1);
            })
            .then((instance) => {
                expect(instance.name).to.equal('update');
                expect(instance.description).to.equal('update desc');
                done();
            }, (err) => {
                expect(err).to.be.equal(CODE.SECTION_NAME_EXIST);
                done();
            });
    });

    it('should findAll : 0 sections while begin', (done) => {
        sectionService
            .findAll().then((data) => {
                expect(data.length).to.be.equal(0);
                done();
            });
    });

    it('should findAll : 2 sections while begin', (done) => {
        sectionService
            .create({
                name: 'test',
                description: 'test descss'
            })
            .then(() => {
                return sectionService
                    .create({
                        name: 'update',
                        description: 'update desc'
                    });
            })
            .then(() => {
                return sectionService.findAll();
            }).then((data) => {
                expect(data.length).to.be.equal(2);
                done();
            });
    });

    it('should return  errcode if id not exist while try to delete', (done) => {
        sectionService
            .delete(1)
            .catch((err) => {
                expect(err).to.equal(CODE.SECTION_TARGET_NOT_EXIST);
                done();
            });
    });
    it('should del sections', (done) => {
        sectionService
            .create({
                name: 'test',
                description: 'test descss'
            })
            .then((id) => {
                return sectionService.delete(id);
            })
            .then((code) => {
                expect(code).to.equal(0);
                done();
            });
    });

    it('should escape name an description', (done) => {
        sectionService
            .create({
                name: '<test',
                description: '&test descss'
            })
            .then((id) => {
                return sectionService.findById(id);
            })
            .then((section) => {
                expect(section.name).equal('&lt;test');
                expect(section.description).equal('&amp;test descss');
                done();
            });
    });
});


describe('categoryService', () => {
    beforeEach((done) => {
        const category = sequelize.model('category');
        category
            .truncate()
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });


    it('should create a new category', (done) => {
        categoryService.create({
            name: 'test-cate',
            description: 'cate-desc'
        }).then((data) => {
            expect(data.name).to.equal('test-cate');
            done();
        });
    });

    it('should return errcode if same category exist while try create', (done) => {
        categoryService
            .create({
                name: 'test-cate',
                description: 'cate-desc'
            })
            .then((data) => {
                return categoryService.create({
                    name: 'test-cate',
                    description: 'cate-desc'
                });
            })
            .catch((err) => {
                expect(err).to.equal(CODE.CATEGORY_EXIST);
                done();
            });
    });

    it('should return errcode if same category parent not found while try to create', (done) => {
        categoryService
            .createSingle({
                name: 'test-cate',
                description: 'cate-desc',
                parent_id: 10
            })
            .catch((err) => {
                expect(err).to.equal(CODE.CATEGORY_NOT_FOUND);
                done();
            });
    });


    it('should delete cate', (done) => {
        categoryService
            .create({
                name: 'test-cate',
                description: 'cate-desc'
            })
            .then((data) => {
                return categoryService.delete(data.id);
            })
            .then(() => {
                return categoryService.findAll();
            })
            .then((data) => {
                expect(data.length).to.equal(0);
                done();
            });
    });


    it('should findByParentId find its child', (done) => {
        categoryService
            .create({
                name: 'test-cate',
                description: 'cate-desc'
            })
            .then((data) => {
                return categoryService.create({
                    name: 'test-cate',
                    description: 'cate-desc',
                    parent_id: data.id
                });
            })
            .then((data) => {
                return categoryService.findByParentId(data.parent_id);
            })
            .then((data) => {
                expect(data.length).to.equal(1);
                done();
            });
    });

    it('should findByParentId empty while parent not exist', (done) => {
        categoryService
            .create({
                name: 'test-cate',
                description: 'cate-desc'
            })
            .then((data) => {
                return categoryService.create({
                    name: 'test-cate',
                    description: 'cate-desc',
                    parent_id: data.id
                });
            })
            .then(() => {
                return categoryService.findByParentId(100);
            })
            .then((data) => {
                expect(data.length).to.equal(0);
                done();
            });
    });


    it('should create nested by call createMulti', (done) => {
        categoryService.createMulti([{
            name: 'test-cate1',
            description: 'cate-desc',
            children: [{
                name: 'test-cate2',
                description: 'cate-desc'
            }]
        }]).then(() => {
            return categoryService.findAll();
        }).then((data) => {
            expect(data.length).to.equal(1);
            expect(data[0].children.length).to.equal(1);
            done();
        });
    });

    // 下面两个测试不能一起，跑，我也不懂为什么。还没有时间研究，先这样。
    it('should create multi cates by call createMulti', (done) => {
        categoryService.createMulti([{
            name: 'test-cate1',
            description: 'cate-desc'
        }, {
            name: 'test-cate2',
            description: 'cate-desc'
        }]).then((data) => {
            const result = _.map(data, (item) => {
                return item.toJSON();
            });
            expect(result.length).to.equal(2);
            done();
        });
    });

    // 暂时对事务还不是特别的了解，不知道是否在 find 的时候也会在事务中 find 一下。
    it('should createMulti return errcode while name duplicate', (done) => {
        categoryService
            .createMulti([{
                name: 'test-cate10',
                description: 'cate-desc',
            }])
            .then((data) => {
                return categoryService.createMulti([{
                    name: 'test-cate2',
                    description: 'cate-desc',
                    parent_id: data.id
                }, {
                    name: 'test-cate2',
                    description: 'cate-desc',
                    parent_id: data.id
                }]);
            })
            .catch((err) => {
                expect(err).to.equal(CODE.CATEGORY_CREATE_NAME_DUPLICATE);
                done();
            });
    });

    it('should createMulti return errcode while parent not exist', (done) => {
        categoryService
            .createMulti([{
                name: 'test-cate10',
                description: 'cate-desc',
                parent_id: 100
            }])
            .catch((err) => {
                expect(err).to.equal(CODE.CATEGORY_NOT_FOUND);
                done();
            });
    });


    it('should del multi ', (done) => {
        categoryService
            .createMulti([{
                name: 'test-cate1',
                description: 'cate-desc',
                children: [{
                    name: 'test-cate2',
                    description: 'cate-desc'
                }]
            }])
            .then(() => {
                return categoryService.delMulti([1, 2]);
            })
            .then(() => {
                return categoryService.findAll();
            })
            .then((data) => {
                expect(data.length).to.equal(0);
                done();
            });
    });

    it('should updateMult ', (done) => {
        const newCates = [{
            name: 'test-cate1',
            description: 'cate-desc',
        }, {
            name: 'test-cate2',
            description: 'cate-desc'
        }];
        const updateCates = [{
            id: 1,
            name: 'test-update'
        }, {
            id: 2,
            name: 'test-update2'
        }];

        categoryService
            .createMulti(newCates)
            .then(() => {
                return categoryService.updateMulti(updateCates);
            })
            .then(() => {
                return categoryService.findAll();
            })
            .then((data) => {
                expect(data[0].name).to.equal('test-update');
                expect(data[1].name).to.equal('test-update2');
                done();
            });
    });

    // 使用事务的时候，无法保证哪个先，那个后啊。
    // 除非使用多 sql 语句？
    it('should findmulti by ids [1,2] ', (done) => {
        const newCates = [{
            name: 'test-cate1',
            description: 'cate-desc',
        }, {
            name: 'test-cate2',
            description: 'cate-desc'
        }];

        categoryService
            .createMulti(newCates)
            .then(() => {
                return categoryService.findByIds([1, 2]);
            })
            .then((data) => {
                const result = _.map(data, (item) => {
                    return item.toJSON();
                });
                expect(result.length).to.equal(2);
                done();
            });
    });


    it('should escape name and description ', (done) => {
        const newCates = [{
            name: '>test-cate1',
            description: '"cate-desc',
        }];

        categoryService
            .createMulti(newCates)
            .then(() => {
                return categoryService.findByIds([1]);
            })
            .then((data) => {
                const [cate] = data;
                expect(cate.name).equal('&gt;test-cate1');
                expect(cate.description).equal('&quot;cate-desc');
                done();
            });
    });
});


describe('brand model', () => {
    it('should find all model info', () => {
        const infos = brandService.getModelAllInfo(155, 1324, 19214);
        const [brand, series, model] = infos;
        expect(brand).to.eql({
            id: '155',
            first_char: 'S',
            brand_name: '斯达泰克',
            logo: 'car_brand/1442282420CLAsXk.jpg',
        });
        expect(series).to.eql({
            id: '1324',
            line_name: '斯达泰克-卫士'
        });
        expect(model).to.eql({
            id: '19214',
            model_name: '2015款 2.2T 90'
        });
    });

    it('should empty obj while can not find info -- model', () => {
        const infos = brandService.getModelAllInfo(155, 1324);
        const [brand, series, model] = infos;
        expect(model).to.eql({});
    });
    it('should empty obj while can not find info -- series', () => {
        const infos = brandService.getModelAllInfo(155);
        const [brand, series, model] = infos;
        expect(series).to.eql({});
    });
    it('should empty obj while can not find info -- brand', () => {
        const infos = brandService.getModelAllInfo();
        const [brand, series, model] = infos;
        expect(brand).to.eql({});
    });
    it('should empty obj while can not find info -- all', () => {
        const infos = brandService.getModelAllInfo(0, 0, 0);
        const [brand, series, model] = infos;
        expect(brand).to.eql({});
        expect(series).to.eql({});
        expect(model).to.eql({});
    });
    it('should empty obj while can not find info -- all', () => {
        const infos = brandService.getModelAllInfo(0, 1324, 0);
        const [brand, series, model] = infos;
        expect(brand).to.eql({});
        expect(series).to.eql({});
        expect(model).to.eql({});
    });

    it('should get brands which each brand has not seriers property', () => {
        const brands = brandService.getBrands();
        expect(!!brands.length).to.equal(true);
        expect(brands[0].series).to.equal(undefined);
    });

    it('should getSeries by id and', () => {
        const series = brandService.getSeries(155);
        expect(!!series.length).to.equal(true);
    });

    it('should models by brandId and seriesId', () => {
        const series = brandService.getModels(155, 1324);
        expect(!!series.length).to.equal(true);
    });

    it('should model by brandId and seriesId , modelId', () => {
        const model = brandService.getModel(155, 1324, 19214);
        expect(model.model_name).to.equal('2015\u6b3e 2.2T 90');
    });
});


describe('fileService', () => {
    let fileTable;

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

    beforeEach((done) => {
        fileTable = sequelize.model('file');
        fileTable
            // .sync({
            //     force: true
            // })
            .truncate()
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });

    it('file findById should not find deleted item', (done) => {
        createFile({
            status: 1
        })
            .then(() => {
                return fileService.findById(1);
            })
            .then((data) => {
                expect(data).eq(null);
                done();
            });
    });


    it('should find duplicate file', (done) => {
        createFile({
            status: 0
        })
            .then(() => {
                return fileService.findSameByIdsAndName({
                    name: 'test',
                    ext: 'png',
                    brand_id: '1',
                    series_id: '2',
                    model_id: '3',
                    type_ids: '11,12,13',
                    section_id: '21'
                });
            })
            .then((data) => {
                expect(data.id).equal(1);
                expect(data).not.equal(null);
                done();
            });
    });

    it('should not find duplicate file', (done) => {
        createFile({
            status: 0
        })
            .then(() => {
                return fileService.findSameByIdsAndName({
                    name: 'test',
                    ext: 'png',
                    brand_id: '1',
                    series_id: '2',
                    model_id: '3',
                    type_ids: '11,12,14',
                    section_id: '21'
                });
            })
            .then((data) => {
                expect(data).equal(null);
                done();
            });
    });


    it('should find same name file', (done) => {
        createFile({
            status: 0
        })
            .then(() => {
                return fileService.findSameByName({
                    name: 'test',
                    ext: 'png'
                });
            })
            .then((data) => {
                expect(data.id).equal(1);
                expect(data).not.equal(null);
                done();
            });
    });

    it('should find same name file', (done) => {
        createFile({
            status: 0
        })
            .then(() => {
                return fileService.findSameByName({
                    name: 'test2',
                    ext: 'png'
                });
            })
            .then((data) => {
                expect(data).equal(null);
                done();
            });
    });

    it('should find files without deleted files', (done) => {
        createFile({
            status: 1
        })
            .then(() => {
                return fileService.findAllByDesc({
                    ext: 'png'
                });
            })
            .then(({
                count,
                rows
            }) => {
                expect(count).equal(0);
                done();
            });
    });
    it('should find files by $like name', (done) => {
        createFile({
            status: 0
        })
            .then(() => {
                return fileService.findAllByDesc({
                    name: 'tes'
                });
            })
            .then(({
                count,
                rows
            }) => {
                expect(count).equal(1);
                done();
            });
    });

    it('should escape file name , description, ext', (done) => {
        createFile({
            name: '<test',
            description: '>testdesc',
            ext: '&png'
        }).then(() => {
            return fileService.findById(1);
        }).then((file) => {
            expect(file.name).equal('&lt;test');
            expect(file.description).equal('&gt;testdesc');
            expect(file.ext).equal('&amp;png');
            done();
        });
    });

    it('should change file status to 1 while delete file', (done) => {
        createFile({
            name: '<test',
            description: '>testdesc',
            ext: '&png'
        }).then(() => {
            return fileService.updateDel(1, 1);
        }).then((data) => {
            return fileService.findById(1);
        }).then((file) => {
            expect(file).equal(null);
            done();
        });
    });

    it('should not find the deleted file while check duplicate', (done) => {
        createFile({
            name: '<test',
            description: '>testdesc',
            ext: '&png'
        }).then(() => {
            return fileService.updateDel(1, 1);
        }).then((data) => {
            return fileService.findSameByIdsAndName({
                name: '<test',
                ext: '&png',
                brand_id: '1',
                series_id: '2',
                model_id: '3',
                type_ids: '11,12,13',
                section_id: '21'
            });
        }).then((file) => {
            expect(file).equal(null);
            return fileService.findSameByName({
                name: '<test',
                ext: '&png',
            });
        })
            .then((file) => {
                expect(file).equal(null);
                done();
            });
    });
});


describe('section, category del assoiation', () => {
    function createFile(name) {
        return fileService
            .create({
                name: name || 'test',
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
                section_id: '1',
                is_open: '31'
            });
    }

    function createFileByTypeId(type_a_id = 1, type_b_id = 2, type_c_id = 3) {
        return fileService
            .create({
                name: 'test',
                path: 'F:\\SVN\\12312312',
                ext: 'png',
                size: 1024,
                md5: 'd69a34cc70dd52def4a7fb3919c73fc3',
                brand_id: '1',
                series_id: '2',
                model_id: '3',
                type_a_id,
                type_a_name: 'a',
                type_b_id,
                type_b_name: 'b',
                type_c_id,
                type_c_name: 'c',
                section_id: '1',
                is_open: '31'
            });
    }


    beforeEach((done) => {
        const section = sequelize.model('section');
        const file = sequelize.model('file');
        const category = sequelize.model('category');

        Promise
            .all([
                section.truncate(),
                file.truncate(),
                category.truncate()
            ])
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });

    it('should change file section_id while the corresponding section be deleted', (done) => {
        function createSection() {
            return sectionService.create({
                name: 'test',
                description: '1'
            });
        }

        Promise
            .all([createFile('test1'), createFile('test2'), createSection()])
            .then(() => {
                return sectionService.delete(1);
            })
            .then(() => {
                return Promise.all([fileService.findById(1), fileService.findById(2)]);
            })
            .then((files) => {
                expect(files[0].section_id).equal(0);
                expect(files[0].section_name).equal('其他');
                expect(files[1].section_id).equal(0);
                expect(files[1].section_name).equal('其他');
                done();
            });
    });


    it('should update file type_x_id while the corresponding cate be deleted: type_a_id', (done) => {
        function createCate() {
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
        }

        Promise
            .all([createFileByTypeId(), createCate()])
            .then(() => {
                return categoryService.delMulti([1]);
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.type_a_id).equal(0);
                expect(file.type_a_name).equal('其他');
                expect(file.type_b_id).equal(0);
                expect(file.type_b_name).equal('');
                expect(file.type_c_id).equal(0);
                expect(file.type_c_name).equal('');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('should update file type_x_id while the corresponding cate be deleted: type_b_id', (done) => {
        function createCate() {
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
        }

        Promise
            .all([createFileByTypeId(), createCate()])
            .then(() => {
                return categoryService.delMulti([2]);
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.type_a_id).equal(1);
                expect(file.type_a_name).equal('a');
                expect(file.type_b_id).equal(0);
                expect(file.type_b_name).equal('');
                expect(file.type_c_id).equal(0);
                expect(file.type_c_name).equal('');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('should update file type_x_id while the corresponding cate be deleted: type_c_id', (done) => {
        function createCate() {
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
        }

        Promise
            .all([createFileByTypeId(), createCate()])
            .then(() => {
                return categoryService.delMulti([3]);
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.type_a_id).not.equal(0);
                expect(file.type_b_id).not.equal(0);
                expect(file.type_c_id).equal(0);
                expect(file.type_c_name).equal('');
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('should update multi file type_x_id while the corresponding cate be deleted: type_a_id', (done) => {
        function createCate() {
            return categoryService.createMulti([{
                name: 'test-cate1',
                description: 'cate-desc'
            }, {
                name: 'test-cate2',
                description: 'cate-desc',
                children: [{
                    name: 'test-cate3',
                    description: 'cate-desc',
                    children: [{
                        name: 'test-cate4',
                        description: 'cate-desc',
                    }]
                }]
            }]);
        }

        Promise
            .all([createFileByTypeId(1, 0, 0), createCate()])
            .then(() => {
                return createFileByTypeId(2, 3, 4);
            })
            .then(() => {
                return categoryService.delMulti([1, 3]);
            })
            .then(() => {
                return Promise.all([fileService.findById(1), fileService.findById(2)]);
            })
            .then((files) => {
                expect(files[0].type_a_id).equal(0);
                expect(files[0].type_b_id).equal(0);
                expect(files[0].type_c_id).equal(0);
                expect(files[1].type_a_id).equal(2);
                expect(files[1].type_b_id).equal(0);
                expect(files[1].type_c_id).equal(0);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('should update file type_x_id to the first cate while the corresponding cate be deleted: type_b_id', (done) => {
        function createCate() {
            return categoryService.createMulti([{
                name: 'test-cate1',
                description: 'cate-desc',
                children: [{
                    name: 'test-cate2',
                    description: 'cate-desc'
                }, {
                    name: 'test-cate3',
                    description: 'cate-desc'
                }]
            }]);
        }

        Promise
            .all([createFileByTypeId(1, 2, 0), createCate()])
            .then(() => {
                return categoryService.delMulti([2]);
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.type_a_id).equal(1);
                expect(file.type_b_id).equal(3);
                expect(file.type_b_name).equal('test-cate3');
                expect(file.type_c_id).equal(0);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    it('should update file type_x_id to the first cate while the corresponding cate be deleted: type_b_id', (done) => {
        function createCate() {
            return categoryService.createMulti([{
                name: 'test-cate1',
                description: 'cate-desc',
                children: [{
                    name: 'test-cate2',
                    description: 'cate-desc',
                    children: [{
                        name: 'test-cate3',
                        description: 'cate-desc'
                    }, {
                        name: 'test-cate4',
                        description: 'cate-desc'
                    }]
                }]
            }]);
        }

        Promise
            .all([createFileByTypeId(1, 2, 4), createCate()])
            .then(() => {
                return categoryService.delMulti([4]);
            })
            .then(() => {
                return fileService.findById(1);
            })
            .then((file) => {
                expect(file.type_a_id).equal(1);
                expect(file.type_b_id).equal(2);
                expect(file.type_c_id).equal(3);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
});


describe('chunkService', () => {
    const chunk = sequelize.model('chunk_file');


    beforeEach((done) => {
        chunk
            .truncate()
            .then(() => {
                done();
            }, (err) => {
                throw err;
            });
    });

    // 文件分片纯在 md5 碰撞的可能性．在查找分片的时候，需要限制在对应的文件下．
    it('shold find md5 with file_id restrict', (done) => {
        const fakeData = {
            md5: '12312',
            file_id: 1,
            size: '123123',
            idx: 1,
            path: ''
        };

        const fakeData2 = _.extend({}, fakeData, {
            file_id:'2'
        });

        Promise.all([
            chunkService.findOrCreate(fakeData),
            chunkService.findOrCreate(fakeData2)
        ]).then(() => {
            return chunkService.findAllByFileId('2');
        }).then(({ chunks }) => {
            expect(chunks[0].md5).to.equals(fakeData2.md5);
            expect(chunks[0].file_id).to.equals(2);
            done();
        }).catch((err) => {
            console.log(err);
        });
    });
});
