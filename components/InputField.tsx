import styles from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

function InputField({
  label,
  value,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  error,
}: InputFieldProps) {
  return (
    <div className={styles.InputField}>
      <label className={styles.InputLabel} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${styles.Input} ${error ? styles.Error : ""}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputField;
