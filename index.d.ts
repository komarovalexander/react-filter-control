export declare interface IField {
  name: string;
  caption: string;
  operators: any;
}

export declare interface IGroup {
  name: string;
  caption: string;
}

export declare interface IOperator {
  name: string;
  caption: string;
}

export declare interface IFilterValueItem {
  key: any;
  field: string;
  operator: string;
  value: any;
}

export declare interface IFilterControlFilterValueGroup {
  key: any;
  groupName: string;
  items: Array<IFilterControlFilterValue | IFilterValueItem>;
}

export declare interface IFilterControlFilterValue {
  groupName: string;
  items: Array<IFilterControlFilterValue | IFilterValueItem>;
}

export declare interface IFilterControlProps {
  fields: IField[];
  groups: any[];
  filterValue: any;
  onFilterValueChanged: (value: any) => void;
}

declare const FilterControl: React.FunctionComponent<IFilterControlProps> = (props: IFilterControlProps) => {};

export declare const filterData = (data: any[], filterValue: IFilterControlFilterValue): any[] => {};

export default FilterControl;
