import './Input.scss'

const Input = (
  { 
    label, name, type, placeholder,
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
        className={` ${error  && "is-invalid"} `}
        name={name}
        type={type}
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
