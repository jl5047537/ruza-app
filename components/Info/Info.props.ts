import { User } from '@/app/home/Page.props'

export type CryptoCurrency = {
	name: string
	balance: string
}

export interface InfoProps {
	user: User
}