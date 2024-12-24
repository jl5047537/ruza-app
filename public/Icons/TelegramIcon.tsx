import { IconProps } from '@/lib/utils/Icon.props'

const TelegramIcon: React.FC<IconProps> = ({ size = 45, className = '' }) => {
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
			<rect width='50' height='50' rx='10' fill='url(#paint0_linear_100_13)' />
			<path
				d='M35.9332 17.007L32.4626 33.1961C32.2008 34.3387 31.518 34.623 30.5477 34.0847L25.2597 30.2304L22.7082 32.6578C22.4258 32.9371 22.1896 33.1707 21.6454 33.1707L22.0253 27.8437L31.826 19.084C32.2521 18.7082 31.7336 18.5 31.1637 18.8758L19.0477 26.4219L13.8316 24.807C12.697 24.4566 12.6765 23.6847 14.0678 23.1465L34.47 15.3719C35.4146 15.0215 36.2412 15.5801 35.9332 17.007Z'
				fill='white'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_100_13'
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

export default TelegramIcon
