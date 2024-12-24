'use client';
import Link from 'next/link';
import styles from './Menu.module.scss';
import { MenuItem } from './Menu.props';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
var Menu = function () {
    var activePage = usePathname();
    return (<div className={styles.menu}>
			{MenuItem.map(function (item) {
            var _a;
            return (<div className={styles.items} key={item.key}>
					<Link className={cn((_a = {}, _a[styles.active] = activePage === item.href, _a))} href={item.href}>
						{item.nameItem}
					</Link>
				</div>);
        })}
		</div>);
};
export default Menu;
