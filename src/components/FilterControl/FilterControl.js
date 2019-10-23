import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterGroup from '../FilterGroup';

class FilterControl extends Component {
  constructor(props) {
    super(props);
    const { filterValue } = this.props;
    this.state = {
      filterValue,
    };
    this.onFilterValueChanged = this.onFilterValueChanged.bind(this);
  }

  onFilterValueChanged(filterValue) {
    const { onFilterValueChanged } = this.props;
    this.setState({ filterValue });
    onFilterValueChanged(filterValue);
  }

  render() {
    const { fields, groups } = this.props;
    const { filterValue } = this.state;
    return (
      <div className="fc">
        <FilterGroup
          fields={fields}
          groups={groups}
          filterValue={filterValue}
          onFilterValueChanged={this.onFilterValueChanged}
        />
      </div>
    );
  }
}

FilterControl.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.any).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      caption: PropTypes.string,
    }),
  ),
  filterValue: PropTypes.shape({
    groupName: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.any,
    ),
  }),
  onFilterValueChanged: PropTypes.func.isRequired,
};

FilterControl.defaultProps = {
  groups: [{
    name: 'and',
    caption: 'And',
  }, {
    name: 'or',
    caption: 'Or',
  }],
  filterValue: {
    groupName: 'and',
    items: [],
  },
};

/**
 * @typedef FilterControl
 * @property {Field[]} fields - The fields settings
 * @property {FilterValue} filterValue - The fields settings
 * @property {Group[]} groups - The fields settings
 * @property {event} onFilterValueChanged - The filter value changed handler
 */

/**
 * @typedef FilterValue
 * @type {Object}
 * @property {string} groupName - Group name
 * @property {Array.<FilterValueGroup|FilterValueItem>} items - Items in group
 */

/**
 * @typedef FilterValueGroup
 * @type {Object}
 * @property {key} key - Item key
 * @property {string} groupName - Group name
 * @property {Array.<FilterValueGroup|FilterValueItem>} items - Items in group
 */

/**
 * @typedef FilterValueItem
 * @type {Object}
 * @property {key} key - Item key
 * @property {string} field - Field
 * @property {string} operator - Operator
 * @property {any} value - Value
 */

/**
 * @typedef Field
 * @type {Object}
 * @property {string} name - Field name
 * @property {string} caption - Field caption
 * @property {Operator[]} operators - Field operators
 */

/**
 * @typedef Operator
 * @type {Object}
 * @property {string} name - Operator name
 * @property {string} caption - Operator caption
 */

export default FilterControl;
