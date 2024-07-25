import { IColor } from './interfaces'

const CircleColor = ({color, ...rest}: IColor) => {
    return <span className={`block w-5 h-5 bg-[${color}] rounded-full cursor-pointer`} style={{backgroundColor: color}} {...rest}/>;
}

export default CircleColor;
