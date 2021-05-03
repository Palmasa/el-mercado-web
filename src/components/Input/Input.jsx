import './Input.scss'

const Input = ({ 
    label, name, type, value ,placeholder,
    onChange, onBlur, onFocus, autoComplete,
    error
  }) => {

  return (
    <div className="container">
    <div className="row">

      <div className="col">
        <label htmlFor={name} >
          {label}
        </label>
      </div>

      <div className="col Input" >
        <input
          className={`${error  && "is-invalid"} `}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
        />
          <div>
            <small>{error}</small>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Input
