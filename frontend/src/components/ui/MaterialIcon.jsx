export default function MaterialIcon({ name, className = '', fill = false, weight, size, style = {} }) {
  const variationStyle = {
    ...style,
  }
  if (fill) {
    variationStyle.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
  }
  if (weight) {
    variationStyle.fontVariationSettings = `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
  }

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={variationStyle}
    >
      {name}
    </span>
  )
}
