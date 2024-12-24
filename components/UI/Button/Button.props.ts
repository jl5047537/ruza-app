import React from 'react'

export interface ButtonProps {
	className?: string
	type?: 'button' | 'submit' | 'reset' | undefined
	disabled?: boolean
	onClick?: () => void
	children?: React.ReactNode
}
