

        /*
        *
        * UI(展示)组件---选择器
        *
        * */
        import React, { PropTypes } from 'react';

            // 创建组件
        const Picker = ({ value, onChange, options}) => (
            <span>
                <h1>{value}</h1>
                <select onChange={e => onChange(e.target.value)}
                        value={value}>
                    {options.map(option =>
                        <option value={option} key={option}>
                            {option}
                        </option>)
                    }
                </select>
          </span>
        )

            // props验证
        Picker.propTypes = {
            value: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.string.isRequired
            ).isRequired
        }

        export default Picker;