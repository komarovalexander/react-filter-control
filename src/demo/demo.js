import React from 'react';
import FilterControl from '../filterControl';
import { filterValue, fields, groups } from './data';

const stringifyFilterValue = filterValue => JSON.stringify(filterValue, null, '  ');

export default class FilterControlDemo extends React.Component {
  state = {
    filterValueText: stringifyFilterValue(filterValue),
  }

  handleFilterValueChanged = (filterValue) => {
    this.setState({
      filterValueText: stringifyFilterValue(filterValue),
    });
  }

  render() {
    const { filterValueText } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '30px' }}>
          <FilterControl
            fields={fields}
            groups={groups}
            filterValue={filterValue}
            onFilterValueChanged={this.handleFilterValueChanged}
          />
        </div>
        <div>
          <h3>Filter value:</h3>
          <pre>
            {filterValueText}
          </pre>
        </div>
      </div>
    );
  }
}
