import React from 'react';
import PropTypes from 'prop-types';
import './ContextMenu.css';

const ContextMenu = ({
  items, visible, keyField, activeIndex, onItemClick, textField,
}) => (
  <div className={`fc-contextmenu${visible ? '' : ' fc-hidden'}`}>
    {
      items.map((item, index) => {
        const onItemClickHandler = () => onItemClick(index);
        return (
          <div
            key={keyField ? item[keyField] : index}
            index={index}
            className={`fc-contextmenu-item${index === activeIndex ? ' fc-contextmenu-item-active' : ''}`}
            onClick={onItemClickHandler}
            onKeyDown={onItemClickHandler}
            role="menuitem"
            tabIndex="0"
          >
            {textField ? item[textField] : item}
          </div>
        );
      })
    }
  </div>
);

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  visible: PropTypes.bool,
  keyField: PropTypes.string,
  activeIndex: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
  textField: PropTypes.string,
};

ContextMenu.defaultProps = {
  visible: false,
  keyField: '',
  activeIndex: 0,
  textField: '',
};

export default ContextMenu;
