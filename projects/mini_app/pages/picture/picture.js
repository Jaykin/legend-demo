Page({
    data: {
        sourceImgUrl: '',
        imgWidth: 0,
        imgHeight: 0,
        actions: [{
            text: '反转颜色',
            type: 'handleReverseColor',
        }, {
            text: 'B',
            type: 'b',
        }],
    },

    _sharedData: {
        isInited: false,
        imgWrapperWidth: 0,
        pixelData: [],
    },

    onLoad() {
        this._init();
    },

    _init() {
        const query = wx.createSelectorQuery();

        query.select('.img-wrapper')
            .boundingClientRect((rect) => {
                this._sharedData.imgWrapperWidth = rect.width;
            }).exec();
    },

    handleCanvasError(err) {
        console.error(err)
    },

    handleChooseImg() {
        const _this = this;

        wx.chooseImage({
            count: 1,
            success: function(res){
                const path = res.tempFilePaths[0];
                const { imgWrapperWidth } = _this._sharedData;

                wx.getImageInfo({
                    src: path,
                    success: function(data){
                        const { width, height } = data;
                        _this.setData({
                            sourceImgUrl: path,
                            imgWidth: imgWrapperWidth,
                            imgHeight: Math.floor(imgWrapperWidth * height / width),
                        });
                        _this._initCanvas(path);
                    },
                    fail(err) {
                        console.log(err);
                    }
                })
            },
        })
    },

    _initCanvas(path) {
        const _this = this;
        const { imgWidth, imgHeight } = this.data;
        const canvasId = 'imger';
        const ctx = wx.createCanvasContext(canvasId);
        console.log(path, imgWidth, imgHeight);
        // this._sharedData.ctx = ctx;
        ctx.drawImage(path, 0, 0, imgWidth, imgHeight);
        ctx.draw(false, () => {
            wx.canvasGetImageData({
                canvasId,
                x: 0,
                y: 0,
                width: imgWidth,
                height: imgHeight,
                success(data) {
                    _this._sharedData.pixelData = data.data;
                },
                fail(err) {
                    console.log(err);
                }
            });
        });
    },

    handleActions(e) {
        const { type } = e.target.dataset;

        if (this._sharedData.pixelData.length && this[type]) {
            this[type] && this[type]();
        }
    },

    // 反转颜色
    handleReverseColor() {
        const { pixelData } = this._sharedData;

        this.putPixelDataToCanvas(pixelData.map((px, idx) => {
            if (idx % 4 === 0) {
                // R 通道
                return px ^ 255;
            } else if (idx % 4 === 1) {
                // G 通道
                return px ^ 255;
            } else if (idx % 4 === 2) {
                // B 通道
                return px ^ 255;
            } else if (idx % 4 === 3) {
                // alpha 通道
                return px;
            }
        }));
    },

    putPixelDataToCanvas(data) {
        wx.canvasPutImageData({
            canvasId: 'imger',
            data,
            x: 0,
            y: 0,
            width: this.data.imgWidth,
            height: this.data.imgHeight,
            fail(err) {
                console.error(err);
            }
        });
    },
});