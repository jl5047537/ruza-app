'use client'

import React, { createContext, ReactNode, useContext } from 'react'
import { toast, Toaster, ToasterProps } from 'react-hot-toast'

type ToastContextType = {
	showToast: (message: string, type: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const toasterConfig: ToasterProps = {
	position: 'top-center',
	toastOptions: {
		className: '',
		style: {
			background: '#000000',
			color: '#fff',
			border: '1px solid #22222250',
		},
		success: {
			iconTheme: {
				primary: '#00ffa3',
				secondary: '#000000',
			},
		},
		error: {
			iconTheme: {
				primary: '#ff4848',
				secondary: '#000000',
			},
		},
	},
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const showToast = (message: string, type: 'success' | 'error') => {
		if (type === 'success') {
			toast.success(message)
		} else {
			toast.error(message)
		}
	}

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<Toaster {...toasterConfig} />
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context.showToast
}
