import { InputContainer } from "./style";

interface InputProps {
  label: string;
  placeholder: string;
  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

const Input = ({ label, placeholder, name, value }: InputProps) => {
  return (
    <InputContainer>
      <label htmlFor="">{label}</label>
      <input type="text" placeholder={placeholder} name={name} value={value} />
    </InputContainer>
  );
};

export default Input;
