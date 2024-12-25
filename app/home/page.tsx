'use client'

import Content from '@/components/Content/Content'
import Header from '@/components/Header/Header'
import Preloader from '@/components/Preloader/Preloader'
import { useState } from 'react'
import styles from './Page.module.scss'
import { User } from './Page.props'

const HomePage = () => {
	const [user, setUser] = useState<User | null>(null)
	const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
	const [isLoaded, setIsLoaded] = useState(false)

	const handleLoaded = (loadedUser: User | null, walletConnected: boolean) => {
		setUser(loadedUser)
		setIsWalletConnected(walletConnected)
		setIsLoaded(true)
	}

	if (!isLoaded) {
		return <Preloader onLoaded={handleLoaded} />
	}

	return (
		<div className={styles.home}>
			<Header />
			{user && <Content user={user} isWalletConnected={isWalletConnected} />}
		</div>
	)
}

export default HomePage
