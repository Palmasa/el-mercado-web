import Select from 'react-select'
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#f1ebe4' : '#f9f8f6',
    color: '#2c2728',
    padding: 10,
  }),
  control: (base, state) => ({
    ...base,
    border: '1px solid rgba(0, 0, 0, 0.396);',
    background: '#f9f8f6',
    boxShadow: 'none',
    '&:hover': {
        border: '1px solid rgba(0, 0, 0, 0.396);',
    },
    width: '300px'
  })
}

const SelectCustom = ({ onChange, options, value, index, placeholder }) => {
  
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ""
  }

  return (
      <Select
        styles={customStyles}
        placeholder={placeholder}
        value={defaultValue(options, value)}
        onChange={value => onChange(value, index)}
        options={options}
      />
  )
}

export default SelectCustom