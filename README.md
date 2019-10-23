[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/komarovalexander/react-filter-control/blob/master/LICENSE) [![Build Status](https://travis-ci.com/komarovalexander/react-filter-control.svg?branch=master)](https://travis-ci.com/komarovalexander/react-filter-control)
[![Coverage Status](https://coveralls.io/repos/github/komarovalexander/react-filter-control/badge.svg?branch=master)](https://coveralls.io/github/komarovalexander/react-filter-control?branch=master)
# React Filter Control
The React component for building the composite filter criteria

[Demo (JS)](https://codesandbox.io/s/4xk994jovw)    |    [Demo (TS)](https://codesandbox.io/s/react-typescript-uhtxt)

## Overview
![Filter Control](https://github.com/komarovalexander/react-filter-control/raw/master/static/filter-control.png)

## Installation
npm
```sh
npm install react-filter-control
```
yarn
```sh
yarn add react-filter-control
```

## Usage
### A basic example

```js
import React from "react";
import ReactDOM from "react-dom";
import FilterControl from "react-filter-control";
import { fields, filterValue } from "./data.js";

const handleFilterValueChange = filterValue => {
  // ...
};

const App = () => {
  return (
    <FilterControl
      filterValue={filterValue}
      fields={fields}
      onFilterValueChanged={handleFilterValueChange}
    />
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
```

[Open Example in CodeSandbox](https://codesandbox.io/s/mqnmlypmkp)

## API

<a name="FilterControl"></a>
### FilterControl
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fields | [<code>Array.&lt;Field&gt;</code>](#Field) | The fields settings |
| filterValue | [<code>FilterValue</code>](#FilterValue) | The filterValue settings |
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | The groups settings |
| onFilterValueChanged | <code>event</code> | The filter value changed handler |

<a name="FilterValue"></a>

### FilterValue : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| groupName | <code>string</code> | Group name |
| items | <code>Array.&lt;(FilterValueGroup\|FilterValueItem)&gt;</code> | Items in group |

<a name="FilterValueGroup"></a>

### FilterValueGroup : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>key</code> | Item key |
| groupName | <code>string</code> | Group name |
| items | <code>Array.&lt;(FilterValueGroup\|FilterValueItem)&gt;</code> | Items in group |

<a name="FilterValueItem"></a>

### FilterValueItem : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>key</code> | Item key |
| field | <code>string</code> | Field |
| operator | <code>string</code> | Operator |
| value | <code>any</code> | Value |

<a name="Field"></a>

### Field : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Field name |
| caption | <code>string</code> | Field caption |
| operators | [<code>Array.&lt;Operator&gt;</code>](#Operator) | Field operators |

<a name="Group"></a>

### Group : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Group name |
| caption | <code>string</code> | Group caption |

<a name="Operator"></a>

### Operator : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Operator name |
| caption | <code>string</code> | Operator caption |

## License
This project is licensed under the terms of the [MIT license](/LICENSE).