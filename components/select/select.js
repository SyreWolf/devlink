import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
    borderRadius: '0.375rem',
    borderColor: state.isFocused ? '#edecf1' : '#404144',
    borderWidth: '0.125rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: 'none',
    color: '#edecf1',
    cursor: 'pointer',
    fontSize: '0.875rem',
    '&:hover': {
       borderColor: state.isFocused ? '#edecf1' : '#edecf1',
       backgroundColor: 'rgba(255,255,255,0.1)'
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#313237',
    borderRadius: '0.375rem',
    borderColor: '#edecf1',
    borderWidth: '0.125rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    cursor: 'default',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: '#404144',
    width: '2px'
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#edecf1' : '#BABABA',
    '&:hover': {
       color: state.isFocused ? '#BABABA' : '#edecf1'
    },
    cursor: 'pointer'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#edecf1' : '#BABABA',
    '&:hover': {
       color: state.isFocused ? '#BABABA' : '#edecf1'
    },
    cursor: 'pointer'
  }),
  input: (provided, state) => ({
    ...provided,
    color: '#edecf1',
    fontSize: '0.875rem'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#edecf1',
    fontSize: '0.875rem'
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent'
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#edecf1',
    borderRadius: '0.375rem',
    borderWidth: '0.125rem',
    borderColor: '#BABABA',
    paddingRight: '8px',
    marginRight: '5px'
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: '#edecf1',
    borderRadius: '0.375rem',
    borderWidth: '0.125rem',
    borderColor: '#BABABA',
    '&:hover': {
       backgroundColor: 'rgba(255,255,255,0.1)',
       color: '#f57373'
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'transparent' : 'transparent',
    color: '#edecf1',
    cursor: 'pointer',
    '&:hover': {
       backgroundColor: state.isFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.1)'
    },
    fontSize: '0.875rem'
  })
}


export const SingleSelect = (props) => {
  return (
    <div className="mt-[0.3rem] w-full">
      <Select
        styles={customStyles}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={null}
        isSearchable={true}
        isClearable={true}
        value={props.value}
        options={props.data}
        onChange={props.changeFunc}
      />
    </div>
  );
}

export const SingleSelectLabeled = (props) => {
  const formatGroupLabel = (data) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <span>{data.label}</span>
      <span
        style={{
          backgroundColor: "transparent",
          borderColor: '#404144',
          borderWidth: '0.125rem',
          borderRadius: "0.375rem",
          color: "#edecf1",
          display: "inline-block",
          fontSize: 12,
          fontWeight: "normal",
          lineHeight: "1",
          padding: '3px 6px',
          width: 'fit',
          height: 'fit',
          textAlign: "center"
        }}
      >
        {data.options.length}
      </span>
    </div>
  );

  return (
    <div className="mt-[0.3rem] w-full">
      <Select
        styles={customStyles}
        classNamePrefix="select"
        defaultValue={null}
        isSearchable={true}
        isClearable={true}
        value={props.value}
        options={props.data}
        formatGroupLabel={formatGroupLabel}
        onChange={props.changeFunc}
      />
    </div>
  );
}

export const MultiSelect = (props) => {
  return(
    <div className="mt-[0.3rem] w-full"> 
      <Select
        styles={customStyles}
        defaultValue={null}
        isMulti
        value={props.value}
        options={props.data}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={props.changeFunc}
      />
    </div>
  );
}
