import './MenuHover.scss'

const MenuHover = ({ toggle, categs }) => {
  
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
    { categs.map((cat, i) => <small>{cat}</small>)}
    </div>
  )
}

export default MenuHover
