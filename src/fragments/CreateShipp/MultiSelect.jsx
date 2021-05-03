import Select from 'react-select'

const SelectCustom = ({ onChange, options, value, className }) => {
  
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ""
  }

  return (
    <div>
      <Select
        className={className}
        value={defaultValue(options, value)}
        onChange={value => onChange(value)}
        options={options}
        ismulti
      />
    </div>
  )
}

export default SelectCustom