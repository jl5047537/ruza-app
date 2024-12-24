'use client'

import Content from '@/components/Content/Content'
import Header from '@/components/Header/Header'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from './Page.module.scss'
import { User } from './Page.props'

const HomePage = () => {
	const [user, setUser] = useState<User | null>(null)
	const router = useRouter()

	useEffect(() => {
		const token = localStorage.getItem('jwt')

		if (!token) {
			router.push('/auth')
			return
		}

		fetch('/api/auth/me', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(res => {
				if (!res.ok) {
					localStorage.removeItem('jwt')
					router.push('/auth')
					return null
				}
				return res.json()
			})
			.then(data => {
				if (data?.user) {
					setUser(data.user)
				}
			})
			.catch(error => {
				console.error('Error during user fetch:', error)
			})
	}, [router])

	if (!user) {
		return (
			<div className={styles.loading}>
				<p>Загрузка...</p>
			</div>
		)
	}

	interface ErrorBoundaryProps {
		children: ReactNode
	}

	interface ErrorBoundaryState {
		hasError: boolean
	}

	class ErrorBoundary extends React.Component<
		ErrorBoundaryProps,
		ErrorBoundaryState
	> {
		constructor(props: ErrorBoundaryProps) {
			super(props)
			this.state = { hasError: false }
		}

		static getDerivedStateFromError(_: Error): ErrorBoundaryState {
			return { hasError: true }
		}

		componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
			console.log('Error caught by boundary:', error, errorInfo)
		}

		render() {
			if (this.state.hasError) {
				return <h1>Something went wrong.</h1>
			}

			return this.props.children
		}
	}

	return (
		<ErrorBoundary>
			<div className={styles.home}>
				<Header />
				<Content user={user} />
			</div>
		</ErrorBoundary>
	)
}

export default HomePage
