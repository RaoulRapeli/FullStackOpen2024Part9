import { HeaderProps } from '../interfaces'

const Header = (props:HeaderProps) => {
    return <h1>{props.name}</h1>
}

export default Header