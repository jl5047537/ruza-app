'use client'

import Link from 'next/link'
import styles from './Menu.module.scss'
import { MenuItem } from './Menu.props'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

const Menu = () => {

    const activePage = usePathname()

	return (
		<div className={styles.menu}>
			{MenuItem.map(item => (
				<div className={styles.items} key={item.key}>
					<Link className={cn({[styles.active]: activePage === item.href})} href={item.href}>
						{item.nameItem}
					</Link>
				</div>
			))}
		</div>
	)
}

export default Menu
