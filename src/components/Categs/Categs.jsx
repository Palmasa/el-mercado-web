import './Categs.scss'

const Categs = ({ toggle }) => {
  
  const toggleOut = () => {
    toggle(false)
  }

  const toggleIn = () => {
    toggle(true)
  }

  return (
    <div 
    className="Categs"
    onMouseEnter={toggleIn}
    onMouseLeave={toggleOut}
    >
    
    </div>
  )
}

export default Categs
