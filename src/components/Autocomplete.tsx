import React from "react";
import { GroupBase, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import { AsyncProps } from "react-select/dist/declarations/src/useAsync";

const Autocomplete = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
  >(
  props: AsyncProps<Option, IsMulti, Group> & {
    block?: boolean;
    required?: boolean;
    targetDefaultPortal?: boolean;
  }
) => {
  const { targetDefaultPortal, ...rest } = props;
  const customStyles: StylesConfig<Option, IsMulti, Group> = {
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 10px 0 10px",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
      fontWeight: "normal",
      fontSize: "14px",
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "36px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 5px 0 5px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "normal",
      fontSize: "14px",
      color: "#9a9ba1",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontWeight: "normal",
      fontSize: "14px",
    }),
  };
  return (
    <AsyncSelect
      {...rest}
      {...(!targetDefaultPortal
        ? { menuPortalTarget: document.querySelector("body") }
        : {})}
      styles={customStyles}
    />
  );
};

export default Autocomplete;
