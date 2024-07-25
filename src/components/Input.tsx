import { IFormInput } from "./interfaces";


const Input = ({...rest} : IFormInput) => {
    return (
  <input {...rest}/>
    );
}

export default Input;
