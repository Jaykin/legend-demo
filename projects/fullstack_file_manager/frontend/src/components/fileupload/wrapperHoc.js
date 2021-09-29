import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import {
    fielInfoChange
} from './actions';

export default function wrapperHoc(options) {
    return WrappedComponent => {
        class PropsProxy extends Component {
            render() {
                const { getFieldDecorator, setFieldsValue } = this.props.form;

                return (
                    <Form layout="inline">
                        <WrappedComponent
                            {...options.wrappedProps}
                            opts={{ label: options.label, id: options.id }}
                            getFieldDecorator={getFieldDecorator}
                            setFieldsValue={setFieldsValue}
                        />
                    </Form>
                );
            }
        }

        const opts = {
            onFieldsChange: (props, fields) => {
                console.log('fields ---------');
                console.dir(fields);
                const { fileId, dispatch } = props;
                const fileInfo = { fileId, key: options.id, value: fields[options.id].value };

                dispatch(fielInfoChange(fileInfo));
            }
        }

        return connect()(Form.create(opts)(PropsProxy));
    }
}
