/**
 * Created by Administrator on 2017/2/9.
 */

import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import FilterLink from './FilterLink';


export class Footer extends Component {
    handleFilterChange(nextFilter) {
        this.props.onFilterChange(nextFilter);
    }

    renderFilter(filter, name) {
        let className = '';
        if (filter === this.props.filter) {
            className = 'selected';
        }
        return (
            <FilterLink
                filter={filter}
                activeClassName={className}
                >
                {name}
            </FilterLink>
            //<a href="#"
            //   className={className}
            //   onClick={(e) => {
            //       e.preventDefault();
            //       this.handleFilterChange(filter);
            //   }}>{name}</a>
        )

    }

    render() {
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{this.props.todosCount}</strong> item left</span>
                <ul className="filters">
                    <li>
                        {this.renderFilter(SHOW_ALL, 'All')}
                    </li>
                    <li>
                        {this.renderFilter(SHOW_COMPLETED, 'Completed')}
                    </li>
                    <li>
                        {this.renderFilter(SHOW_ACTIVE, 'Active')}
                    </li>
                </ul>
                <button className="clear-completed" onClick={() => this.props.onClearCompleted()}>Clear completed</button>
            </footer>
        )
    }
}

Footer.propTypes = {
    filter: PropTypes.oneOf([SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE]).isRequired,
    todosCount: PropTypes.number.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired
}