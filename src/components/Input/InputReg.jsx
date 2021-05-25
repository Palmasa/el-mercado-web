

const InputReg = ({ 
    label, name, type, value ,placeholder, min,
    onChange, onBlur, onFocus, autoComplete,
    error
  }) => {

  return (
    <div className="container">
      <div className="row">
          <label htmlFor={name} >
            {label}
          </label>
      </div>

      <div className="row">
        <input
          className={`${error  && "is-invalid"} `}
          name={name}
          type={type}
          value={value}
          min={min}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
        />
      </div>
      <div className="row">
        <p><small>{error}</small></p>
      </div>
    </div>
  )
}

export default InputReg