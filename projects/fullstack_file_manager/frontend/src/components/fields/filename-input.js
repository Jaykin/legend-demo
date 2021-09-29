import { Input } from 'antd';
import generateHoc from './_genarateHoc';

const FilenameInput = (args) => {
    const { getFieldDecorator, filename, opts, handleChange, fileId } =  args;
    const props = {
        placeholder: "需要查询的文件名称",
        size: 'small',
        style: {width: 200},
        onChange: e => {
            let data = { filename: e.target.value };

            // 指定相应文件
            if (fileId) {
                data.fileId = fileId;
                data.key = 'filename'
            }
            handleChange && handleChange(data)
        }
    }

    if (!opts.isFormItem) {
        props.value = filename;
    }

    return generateHoc({
        label: opts.label,
        isFormItem: opts.isFormItem,
        fieldName: opts.id,
        initVal: filename,
        getFieldDecorator,
        children: null
    }, props)(Input);
}


export default FilenameInput;
