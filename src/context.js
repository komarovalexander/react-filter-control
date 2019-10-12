import React from 'react';
import PropTypes from 'prop-types';
import './controls.css';

const AddButton = ({ onClick }) => (
  <div>
    <div
      className="fc-group-button-icon fc-button-add"
      onClick={onClick}
      tabIndex="0"
      aria-label="Add"
      role="button"
    />
  </div>
);
AddButton.propTypes = {
  onClick: PropTypes.func,
};
AddButton.defaultProps = {
  onClick: undefined,
};

const RemoveButton = ({ onClick }) => (
  <div
    className="fc-group-button-icon fc-button-remove"
    onClick={onClick}
    tabIndex="0"
    aria-label="Remove"
    role="button"
  />
);
RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Button = ({ text, color, onClick }) => (
  <div
    className={`fc-dropdownmenu-button fc-button-color-${color || 'default'}`}
    aria-haspopup="true"
    onClick={onClick}
    tabIndex="0"
    role="button"
  >
    <span>{text}</span>
  </div>
);

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  text: '',
  color: '',
};

const Input = ({ value, onChange }) => (
  <input value={value} onChange={onChange} className="fc-value-editor" />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Menu = ({
  visible, handleClose, menuItems, handleMenuItemClick, textField, keyField, activeIndex,
}) => (visible ? (
  <div className="fc-dropdownmenu-contextmenu">
    {
      menuItems.map((item, index) => {
        const onClick = () => handleMenuItemClick(index);
        return (
          <div
            className="fc-dropdownmenu-contextmenu-item"
            key={keyField ? item[keyField] : index}
            selected={index === activeIndex}
            onClick={onClick}
            tabIndex="0"
            role="button"
          >
            {textField ? item[textField] : item}
          </div>
        );
      })
    }
    <div
      className="fc-dropdownmenu-contextmenu-background"
      onClick={handleClose}
      role="button"
      tabIndex="0"
    />
  </div>
) : <div />);

Menu.propTypes = {
  visible: PropTypes.bool,
  handleClose: PropTypes.func,
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleMenuItemClick: PropTypes.func,
  textField: PropTypes.string,
  keyField: PropTypes.string,
  activeIndex: PropTypes.number,
};

Menu.defaultProps = {
  visible: false,
  handleClose: undefined,
  handleMenuItemClick: undefined,
  textField: '',
  keyField: '',
  activeIndex: 0,
};

const FCContext = React.createContext({
  AddButton, RemoveButton, Button, Input, Menu,
});

const { Consumer } = FCContext;

export default Consumer;
