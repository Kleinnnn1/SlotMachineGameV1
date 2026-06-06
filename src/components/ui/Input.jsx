const Input = ({ value, onChange, placeholder, maxLength, disabled, className = '' }) => (
    <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`pixel-input ${className}`}
    />
)

export default Input