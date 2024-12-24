import { IconProps } from '@/lib/utils/Icon.props'

const RuzaIcon: React.FC<IconProps> = ({ size = 45, className = '' }) => {
	const svgSize = `${size}px`
	return (
		<svg
			width={svgSize}
			height={svgSize}
			className={className}
			viewBox='0 0 50 50'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect width='50' height='50' rx='10' fill='url(#paint0_linear_100_3)' />
			<path
				d='M29.124 27.9L23.076 31.4V37L20.64 38.4V17.68L29.124 12.78C29.7587 12.4067 30.3187 12.36 30.804 12.64C31.308 12.92 31.56 13.4333 31.56 14.18V20.9C31.56 21.3853 31.4387 21.908 31.196 22.468C30.972 23.028 30.6733 23.5507 30.3 24.036C29.9453 24.5027 29.5533 24.8573 29.124 25.1C29.7587 24.7267 30.3187 24.68 30.804 24.96C31.308 25.24 31.56 25.7533 31.56 26.5V32.1L29.124 33.5V27.9ZM29.124 25.1V15.58L23.076 19.08V28.6L29.124 25.1ZM29.124 27.9V33.5L26.688 32.1V26.5L29.124 27.9ZM30.832 24.96C30.328 24.68 29.7587 24.7267 29.124 25.1L26.688 23.7C27.3413 23.3267 27.9107 23.28 28.396 23.56L30.832 24.96ZM29.124 15.58V25.1L26.688 23.7V14.18L29.124 15.58ZM29.124 25.1L23.076 28.6L20.64 27.2L26.688 23.7L29.124 25.1ZM30.832 12.64C30.328 12.36 29.7587 12.4067 29.124 12.78L20.64 17.68L18.204 16.28L26.688 11.38C27.3413 11.0067 27.9107 10.96 28.396 11.24L30.832 12.64ZM20.64 17.68V38.4L18.204 37V16.28L20.64 17.68Z'
				fill='white'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_100_3'
					x1='50'
					y1='1.49012e-06'
					x2='-1.49012e-06'
					y2='50'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#007CFB' />
					<stop offset='1' stopColor='#00FFBE' />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default RuzaIcon
