function Button({ label, children }) {
  console.log('children', children);
  
  return (
    <button>{label || children}</button>
  )
}

export default Button;