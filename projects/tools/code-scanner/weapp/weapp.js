#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetDir = '/Users/ming/Desktop/workspace/weapp/tt-mina/weixin_small_program/fulishe';   // 需要扫描的目录
const appJson = require(`${targetDir}/app.json`);

const defTitle = appJson.window.navigationBarTitleText;
let titles = {};

appJson.pages.forEach((page) => {
    const absPagePath = path.resolve(targetDir, page);
    const pageJson = require(`${absPagePath}.json`);
    const tit = pageJson.navigationBarTitleText || defTitle;

    titles[page] = {
        'default': tit,
        share: ''
    };
});

console.log(titles);
