import React from 'react';
import PropTypes from 'prop-types';
import deepCopy from '../../utils/deepCopy';
import DropDownMenu from '../DropDownMenu';
import './FilterGroupSettingsRow.css';
import Consumer from '../../context';

const defaultGroups = [{
  name: 'and',
  caption: 'And',
}, {
  name: 'or',
  caption: 'Or',
}];
const defaultFilterValue = {
  groupName: 'and',
  items: [],
};

const FilterGroupSettingsRow = ({
  filterValue = defaultFilterValue,
  fields,
  onFilterValueChanged,
  groups = defaultGroups,
  removeClick,
}) => {
  const onGroupMenuItemClick = (newGroupName) => {
    const newFilterValue = deepCopy(filterValue);
    newFilterValue.groupName = newGroupName;
    onFilterValueChanged(newFilterValue);
  };

  const getNewKey = items => (items.length ? Math.max(...items.map(o => o.key)) + 1 : 0);

  const addCondition = () => {
    const newFilterValue = deepCopy(filterValue);
    const key = getNewKey(newFilterValue.items);
    const field = fields[0];
    newFilterValue.items.push({
      key,
      field: field.name,
      operator: field.operators[0].name,
      value: field.defaultValue || '',
    });
    onFilterValueChanged(newFilterValue);
  };

  const addGroup = () => {
    const newFilterValue = deepCopy(filterValue);
    const key = getNewKey(newFilterValue.items);
    const group = groups[0];
    newFilterValue.items.push({
      key,
      groupName: group.name,
      items: [],
    });
    onFilterValueChanged(newFilterValue);
  };

  const onAddMenuItemClick = name => (name === 'addCondition' ? addCondition() : addGroup());

  const addMenuItems = [{ name: 'addCondition', caption: 'Add Condition' }, { name: 'addGroup', caption: 'Add Group' }];
  const activeIndex = groups.findIndex(g => g.name === filterValue.groupName);

  return (
    <div className="fc-group-settings-row">
      {
        removeClick && (
        <Consumer>
          {consumer => <consumer.RemoveButton onClick={removeClick} />}
        </Consumer>
        )
      }
      <DropDownMenu
        color="secondary"
        activeIndex={activeIndex}
        textField="caption"
        keyField="name"
        menuItems={groups}
        onMenuItemClick={onGroupMenuItemClick}
      />

      <Consumer>
        { value => (
          <DropDownMenu
            textField="caption"
            activeIndex={1}
            keyField="name"
            menuItems={addMenuItems}
            onMenuItemClick={onAddMenuItemClick}
          >
            <value.AddButton />
          </DropDownMenu>
        )}
      </Consumer>
    </div>
  );
};


FilterGroupSettingsRow.propTypes = {
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

export default FilterGroupSettingsRow;
