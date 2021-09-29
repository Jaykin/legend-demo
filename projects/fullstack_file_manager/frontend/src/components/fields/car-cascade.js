
import React, { Component } from 'react';
import { Select } from 'antd';

import callAPI from '../_utils/api';
import { SUCCESS } from '../_utils/errcode';
import * as storage from '../_utils/storage';

import generateHoc from './_genarateHoc';

import './car-cascade.css';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

/**
 * @props {
 *      getFieldDecorator：{ function } - 用于生成FormItem
 *      setFieldsValue： { function } - 设置表单组件的value
 *      brand: { object } - 组件的初始数据
 *      allItem: { object } - 组件中不限选项的数据
 *      opts: {             - 样式 或 其他设置
 *          label: { string } -
 *          id: { string } - 表单域的key
 *              // 以下均为可选（有默认值），用来调整组件样式
 *          wrapClassName: { string }
 *          brandClassName: { string }
 *          brandDropdownClassName: { string }
 *          lineClassName: { string }
 *          lineDropdownClassName: { string }
 *          modelClassName: { string }
 *          modelDropdownClassName: { string }
 *      }
 * }
 * */

class CarCascade extends Component {
    constructor(props) {
        super(props);

        const { allItemId, allItemDes } = props.allItem;

        // allItem选项
        this.allBrand = [{
            firstChar:'#',
            list:[{ id: allItemId, brand_name: allItemDes }]
        }];
        this.allLine = [{ line_id: allItemId, line: allItemDes }];
        this.allModel = [{ id: allItemId, name: allItemDes }];
        // 标示是否已获得焦点（避免触发两次focux）
        this.brandFocux = false;
        // 标示全部的选项
        this.allItemId = allItemId;
        // 组件的异步请求列表
        this.requests = [];

        this.state = this.getInitState();
    }

    componentWillUnmount() {
        // clean up pending request
        this.requests.forEach(req => req.abort());
    }

    componentWillReceiveProps(nextProps) {
        const nextData = nextProps.brand.initData;
        const curData = this.props.brand.initData;

        if (
            nextData.brandValue != curData.brandValue ||
            nextData.lineValue != curData.lineValue ||
            nextData.modelValue !== curData.modelValue
        ) { this.setState(this.getInitState(nextProps)) }
    }

    getInitState(props) {
        const _props = props || this.props;
        const { initData, initStatu, data } = _props.brand;

        return {
            ...initData,
            ...initStatu,
            brand: this.allBrand.concat(data.brand),
            line: this.allLine.concat(data.line),
            model: this.allModel.concat(data.model),
        }
    }

    resetField() {
        // 撤销级联选择结果，重置为组件初始化时的props数据
        this.setState(this.getInitState());
    }

    buildBrandData(origin) {
        let brand = [];
        let firstChars = [];
        let firstChar = '';
        let charIndex = 0;

        origin.forEach(item => {
            firstChar = item.first_char;
            charIndex = firstChars.indexOf(firstChar);

            if (charIndex < 0) {
                brand.push({
                    firstChar: firstChar,
                    list: [{
                        id: item.id,
                        brand_name: item.name
                    }]
                });
                firstChars.push(firstChar);
            } else {
                brand[charIndex].list.push({
                    id: item.id,
                    brand_name: item.name
                });
            }
        });

        // 品牌排序
        return this.allBrand.concat(brand.sort((a, b) => {
            return a.firstChar.charCodeAt() - b.firstChar.charCodeAt();
        }));
    }

    fetchBrandData() {
        if (this.brandFocux) return;
        this.brandFocux = true;

        let brandData = storage.getBrandStorage();  // 先读缓存
        const _this = this;
        const setState = brand => this.setState({ brand });
        let request = null;

        if (!brandData) {
            request = callAPI.get_car_brand();

            this.requests.push(request);
            request.done(res => {
                if (res.errcode === SUCCESS) {
                    brandData = _this.buildBrandData(res.data);
                    storage.setBrandStorage(brandData);             // 写入缓存
                    setState(brandData);
                }
            });
        } else {
            setState(brandData);
        }
    }

    handleBrandBlur() {
        this.brandFocux = false;
    }

    brandSelected(value, name) {
        const allItemId = this.allItemId;
        const brandName = value == allItemId ? '' : name;
        const { setFieldsValue, handleChange, fileId, setExtraData } = this.props;
        const valObj = {
            brand: value,
            line: allItemId,
            model: allItemId
        }

        this.setState({
            brandValue: value,
            lineValue: allItemId,
            modelValue: allItemId,
            brandSelected: value === allItemId ? false : true,
            lineSelected: false,
            line: this.allLine                  // 这里为了避免接口响应慢，导致line不能及时更新视图
        });

        if (setFieldsValue) {
            // FormItem
            setFieldsValue(valObj);
            setExtraData && setExtraData('brandName', brandName);
        } else {
            valObj.brandName = brandName;
            valObj.fileId = fileId;
            valObj.key = 'brand';
            handleChange && handleChange(valObj);
        }
    }

    fetchLineData() {
        const { brandValue } = this.state;
        const setState = line => this.setState({ line });
        const { allLine } = this;
        let line = storage.getLineStorage(brandValue);
        let request = null;

        if (!line) {
            request = callAPI.get_car_brand({
                data:{ brand_id: brandValue },
            });
            this.requests.push(request);

            request.done(res => {
                if (res.errcode === SUCCESS) {
                    line = allLine.concat(res.data);
                    storage.setLineStorage(brandValue, line);
                    setState(line);
                }
            })
        } else {
            setState(line);
        }
    }

    lineSelected(value, name) {
        const allItemId = this.allItemId;
        const lineName = value == allItemId ? '' : name;
        const { setFieldsValue, handleChange, fileId, setExtraData } = this.props;
        const valObj = {
            line: value,
            model: allItemId
        }

        this.setState({
            lineValue: value,
            modelValue: allItemId,
            lineSelected: value === allItemId ? false : true,
            model: this.allModel
        });

        if (setFieldsValue) {
            // FormItem
            setFieldsValue(valObj);
            setExtraData && setExtraData('lineName', lineName);
        } else {
            valObj.lineName = lineName;
            valObj.fileId = fileId;
            valObj.key = 'line';
            handleChange && handleChange(valObj);
        }
    }

    fetchModelData() {
        const { brandValue, lineValue } = this.state;
        const setState = model => this.setState({ model });
        const { allModel } = this;
        let model = storage.getModelStorage(brandValue, lineValue);
        let request = null;

        if (!model) {
            request = callAPI.get_car_brand({
                data:{
                    brand_id: brandValue,
                    series_id: lineValue
                },
            });
            this.requests.push(request);

            request.done(res => {
                if (res.errcode === SUCCESS) {
                    model = allModel.concat(res.data);
                    storage.setModelStorage(brandValue, lineValue, model);
                    setState(model);
                }
            })
        } else {
            setState(model);
        }
    }

    modelSelected(value, name) {
        const { handleChange, fileId, allItemId, setExtraData } = this.props;
        const modelName = value == allItemId ? '' : name;
        let valObj = {
            model: value
        };

        this.setState({ modelValue: value });

        setExtraData && setExtraData('modelName', modelName);

        if (fileId) {
            valObj.modelName = modelName;
            valObj.fileId = fileId;
            valObj.key = 'model';
        }

        handleChange && handleChange(valObj);
    }

    render() {
        const _state = this.state;
        const { brand, line, model } = _state;
        const { brandValue, lineValue, modelValue, brandSelected, lineSelected } = _state;
        const { getFieldDecorator, opts  } = this.props;
        const filedsName = opts.id ? opts.id.split('_') : [];

        const brandProps = {
            showSearch: true,
            className: opts.brandClassName || "ids-car-cascade-selector",
            size: "small",
            optionFilterProp: "children",
            onSelect: (value, option) => {this.brandSelected(value, option.props.name)},
            notFoundContent: "无搜索结果",
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.brandDropdownClassName || "ids-brand-dropdown",
            onFocus: this.fetchBrandData.bind(this),
            onBlur: this.handleBrandBlur.bind(this)
        };

        const lineProps = {
            className: opts.lineClassName || "ids-car-cascade-selector",
            size: "small",
            disabled: !brandSelected,
            onSelect: (value, option) => {this.lineSelected(value, option.props.name)},
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.lineDropdownClassName || "ids-line-model-dropdown",
            onFocus: this.fetchLineData.bind(this)
        }

        const modelProps = {
            className: opts.modelClassName || "ids-car-cascade-selector",
            size: "small",
            disabled: !lineSelected,
            dropdownMatchSelectWidth: false,
            dropdownClassName: opts.modelDropdownClassName || "ids-line-model-dropdown",
            onFocus: this.fetchModelData.bind(this),
            onSelect: (value, option) => { this.modelSelected(value, option.props.name) }
        }

        // 不是FormItem则需要自己控制组件的value
        if (!opts.isFormItem) {
            brandProps.value = brandValue;
            lineProps.value = lineValue;
            modelProps.value = modelValue;
        }

        return (
            <div className={opts.wrapClassName || "ids-car-cascade-wrap"}>
                {
                    generateHoc({
                        label: opts.label,
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[0],
                        initVal: brandValue,
                        getFieldDecorator,
                        children: brand.map(item => (
                            <OptGroup label={item.firstChar} key={item.firstChar}>
                                {
                                    item.list.map((it, i) => (
                                        <Option value={it.id + ''} name={it.brand_name} key={it.id}>{it.brand_name}</Option>
                                    ))
                                }
                            </OptGroup>
                        ))
                    }, brandProps)(Select)
                }
                {
                    generateHoc({
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[1],
                        initVal: lineValue,
                        getFieldDecorator,
                        children: line.map((item, index) => (
                            <Option value={item.line_id + ''} name={item.line} key={item.line_id}>{item.line}</Option>
                        ))
                    }, lineProps)(Select)
                }
                {
                    generateHoc({
                        isFormItem: opts.isFormItem,
                        fieldName: filedsName[2],
                        initVal: modelValue,
                        getFieldDecorator,
                        children: model.map((item, index) => (
                            <Option value={item.id + ''} name={item.name} key={item.id}>{item.name}</Option>
                        ))
                    }, modelProps)(Select)
                }
            </div>
        )
    }
}

export default CarCascade;

/* 数据结构：
 * 注意：id 即 value
 * @props.brand {
 *       initData: {
 *            brandValue: { string }
 *            lineValue: { string }
 *            modelValue: { string }
 *        },
 *        initStatu: {
 *            brandSelected: { boolean }
 *            lineSelected: { boolean }
 *        },
 *        data: []
 * }
 * **/

/**
 * @props.allItem {
 *      allItemId: { string } - 默认为 'all'
 *      allItemDes: { string } - 默认为 '不限'
 * }
 *
 * */
