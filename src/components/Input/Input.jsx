import './Input.scss'

const Input = (
  { 
    label, name, type, value ,placeholder,
    onChange, onBlur, onFocus,
    error
  }
  ) => {

  return (
    <div className="Input">
      <label htmlFor={name} >
        {label}
      </label>

      <input
        className={`${error  && "is-invalid"} `}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
        <div className="invalid-feedback">
          {error}
        </div>
    </div>
  )
}

export default Input
