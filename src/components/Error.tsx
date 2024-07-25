import { IError } from "./interfaces";


const Error = ({msg} : IError) => {
    return msg ? <span className="block text-red-700 font-semibold text-sm">{msg}</span> : null;

}

export default Error;
