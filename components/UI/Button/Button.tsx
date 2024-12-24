import { ButtonProps } from './Button.props'

const Button: React.FC<ButtonProps> = ({
	className = '',
	type = 'button',
	onClick,
	children,
}) => {
	return (
		<button className={className} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
