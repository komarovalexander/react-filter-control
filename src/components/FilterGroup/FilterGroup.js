import React from 'react';
import PropTypes from 'prop-types';
import Condition from '../Condition';
import deepCopy from '../../utils/deepCopy';
import FilterGroupSettingsRow from '../FilterGroupSettingsRow';
import './FilterGroup.css';

const FilterGroup = ({
  fields, groups, filterValue, onFilterValueChanged, removeClick,
}) => {
  const onItemValueChanged = (index, newValue) => {
    const newFilterValue = deepCopy(filterValue);
    newFilterValue.items[index] = newValue;
    onFilterValueChanged(newFilterValue);
  };

  const removeItem = (index) => {
    const newFilterValue = deepCopy(filterValue);
    newFilterValue.items.splice(index, 1);
    onFilterValueChanged(newFilterValue);
  };

  return (
    <div className="fc-group">
      <FilterGroupSettingsRow
        filterValue={filterValue}
        fields={fields}
        onFilterValueChanged={onFilterValueChanged}
        groups={groups}
        removeClick={removeClick}
      />
      <div className="fc-group-content">
        {
        filterValue.items.map((item, index) => {
          const filterValueHandler = value => onItemValueChanged(index, value);
          const removeClickHandler = () => removeItem(index);
          return item.groupName
            ? (
              <FilterGroup
                key={item.key}
                fields={fields}
                groups={groups}
                filterValue={item}
                onFilterValueChanged={filterValueHandler}
                removeClick={removeClickHandler}
              />
            )
            : (
              <Condition
                key={item.key}
                value={item}
                fields={fields}
                onConditionValueChanged={filterValueHandler}
                removeClick={removeClickHandler}
              />
            );
        })
      }
      </div>
    </div>
  );
};

FilterGroup.propTypes = {
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
  onFilterValueChanged: PropTypes.func,
  removeClick: PropTypes.func,
};

FilterGroup.defaultProps = {
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
  onFilterValueChanged: undefined,
  removeClick: undefined,
};


export default FilterGroup;
