export const isEmpty = (value) => (value == null || value.length === 0);

const contains = (data, item) => data[item.field].includes(item.value);
const equals = (data, item) => typeof item.value === 'string' ? data[item.field].toLowerCase().includes(item.value.toLowerCase())
: data[item.field] === item.value;
const notEqual = (data, item) => !equals(data, item);
const more = (data, item) => data[item.field ] > item.value;
const moreOrEqual = (data, item) => data[item.field ] >= item.value;
const less = (data, item) => data[item.field] < item.value;
const lessOrEqual = (data, item) => data[item.field] < item.value;
const blank = (data, item) => isEmpty(data[item.field]);
const notBlank = (data, item) => !isEmpty(data[item.field]);
export const filterItem = (data, filter) => {
  switch(filter.operator){
    case 'contains': return contains(data, filter);
    case '=': return equals(data, filter);
    case '<>': return notEqual(data, filter);
    case '>': return more(data, filter);
    case '>=': return moreOrEqual(data, filter);
    case '<': return less(data, filter);
    case '<=': return lessOrEqual(data, filter);
    case 'blank': return blank(data, filter);
    case 'notBlank': return notBlank(data, filter);
  }
};

export const filterGroupOr = (data, items) => {
  var filteredData = items.reduce((initialData, item) => {
    if(item.items) {
      const grouped = filterGroup(data, item.name, item.items);
      return initialData.concat(grouped.filter((d) => initialData.indexOf(d) < 0))
    };
    return initialData.concat(data.filter((d) => initialData.indexOf(d) < 0 && filterItem(d, item)));
  }, []);
  return data.filter((d) => filteredData.includes(d));
};

export const filterGroupAnd = (data, items) => {
  return items.reduce((initialData, item) => {
    if(item.items) return filterGroup(initialData, item.name, item.items);
    return initialData.filter((d) => filterItem(d, item));
  }, data);
};

export const filterGroup = (data, name, items) => {
  return name.toLowerCase() === 'or' ? filterGroupOr(data, items) : filterGroupAnd(data, items);
};

export const filterData = (data, filterValue) => {
  return filterGroup(data, filterValue.name, filterValue.items);
};