function Button({ label, children }) {
  return (
    <button>{label || children}</button>
  )
}

export default Button;