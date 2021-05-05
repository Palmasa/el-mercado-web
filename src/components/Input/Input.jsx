import './Input.scss'

const Input = ({ 
    label, name, type, value ,placeholder, min,
    onChange, onBlur, onFocus, autoComplete,
    error
  }) => {

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-4">
          <label htmlFor={name} >
            {label}
          </label>
        </div>

        <div className="col-8 Input" >
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
            <div>
              <small>{error}</small>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Input
