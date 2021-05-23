
import './Button.scss'

const Button = ({ children, type, disabled }) => {
  return (
    <button 
      className="Button"
      type={type}
    >
      {children}
    </button>
  )
}

export default Button

/*  */
