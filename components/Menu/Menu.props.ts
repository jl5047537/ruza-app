interface MenuItemProps {
	id: string
	key: string
	nameItem: string
	href: string
}

export const MenuItem: MenuItemProps[] = [
	{
		id: '1',
		key: 'home',
		nameItem: 'Главная',
		href: '/'
	},
	{
		id: '2',
		key: 'referrals',
		nameItem: 'Рефералы',
		href: '/referrals'
	},
	{
		id: '3',
		key: 'profile',
		nameItem: 'Профиль',
		href: '/profile'
	},
]
