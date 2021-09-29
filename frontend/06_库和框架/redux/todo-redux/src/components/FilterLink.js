
    /*
    * 过滤的链接
    * */

    import React from 'react';
    import { SHOW_ALL } from '../actions/actions';
    import { Link } from 'react-router';

    const FilterLink = ({ filter, children, activeClassName}) => (
        <Link
            to={filter === SHOW_ALL ? '' : filter}
            activeClassName={activeClassName}
            >
            { children }
        </Link>
    )

    export default FilterLink;