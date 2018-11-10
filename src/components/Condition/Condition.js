import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from '../DropDownMenu';
import deepCopy from '../../utils/deepCopy';
import Consumer from '../../context';
import './Condition.css';

const Condition = ({
  fields, removeClick, onConditionValueChanged, value,
}) => {
  const getActiveField = (conditionValue) => {
    const index = fields.findIndex(field => field.name === conditionValue.field);
    const activeField = fields[index];
    const activeOperatorIndex = activeField.operators
      .findIndex(operator => operator.name === conditionValue.operator);
    return {
      index,
      activeOperatorIndex,
      operators: activeField.operators,
      value: conditionValue.value,
    };
  };
  const updateCondition = (propertyName, newValue) => {
    const conditionValue = deepCopy(value);
    conditionValue[propertyName] = newValue;
    if (propertyName === 'field') {
      const activeField = getActiveField(conditionValue);
      conditionValue.operator = activeField.operators[0].name;
      conditionValue.value = '';
    }
    if (propertyName === 'operator') {
      conditionValue.value = '';
    }
    return conditionValue;
  };
  const handleValueChanged = e => onConditionValueChanged(updateCondition('value', e.target.value));
  const handleFieldChanged = newValue => onConditionValueChanged(updateCondition('field', newValue));
  const handleOperatorChanged = newValue => onConditionValueChanged(updateCondition('operator', newValue));
  const activeField = getActiveField(value);

  return (
    <div className="fc-condition">
      <Consumer>
        { consumer => <consumer.RemoveButton onClick={removeClick} /> }
      </Consumer>
      <DropDownMenu
        textField="name"
        keyField="name"
        activeIndex={activeField.index}
        menuItems={fields}
        onMenuItemClick={handleFieldChanged}
      />
      <DropDownMenu
        textField="caption"
        color="primary"
        keyField="name"
        activeIndex={activeField.activeOperatorIndex}
        menuItems={activeField.operators}
        onMenuItemClick={handleOperatorChanged}
      />

      <Consumer>
        { consumer => (
          <consumer.Input
            value={activeField.value}
            onChange={handleValueChanged}
          />
        )}
      </Consumer>
    </div>
  );
};

Condition.propTypes = {
  removeClick: PropTypes.func.isRequired,
  onConditionValueChanged: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.shape({
    field: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
};

export default Condition;
