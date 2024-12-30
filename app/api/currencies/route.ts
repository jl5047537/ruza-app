import { Address } from '@ton/core'
import { TonClient } from '@ton/ton'
import { NextRequest, NextResponse } from 'next/server'

const TON_API_ENDPOINT = 'https://toncenter.com/api/v2/jsonRPC'

// Функция для получения данных о жетонах
async function fetchJettons(client: TonClient, walletAddress: Address) {
	const jettons: { name: string; balance: string }[] = []

	try {
		const result = await client.runMethod(walletAddress, 'get_wallets')
		if (result.stack) {
			while (result.stack.remaining > 0) {
				const jettonWalletCell = result.stack.readCell()
				const jettonWalletAddress = Address.parseRaw(
					jettonWalletCell.bits.toString()
				)

				try {
					const jettonData = await client.runMethod(
						jettonWalletAddress,
						'get_jetton_data'
					)
					const name = jettonData.stack.readString()
					const balance = jettonData.stack.readBigNumber()

					jettons.push({
						name,
						balance: (Number(balance) / 1e9).toFixed(2),
					})
				} catch (error) {
					console.error(
						`Failed to fetch data for Jetton at ${jettonWalletAddress}:`,
						error
					)
				}
			}
		}
	} catch (error) {
		console.error('Error fetching jettons:', error)
	}

	return jettons
}

async function fetchCurrencies(address: string) {
	try {
	  const client = new TonClient({ endpoint: TON_API_ENDPOINT });
	  const walletAddress = Address.parse(address);
  
	  const contractState = await client.getContractState(walletAddress);
	  if (!contractState || contractState.state !== 'active') {
		console.warn('Inactive wallet or no contract state for:', address);
		return [
		  {
			name: 'TON',
			balance: (Number(contractState.balance) / 1e9).toFixed(2),
		  },
		];
	  }
  
	  const currencies = [
		{
		  name: 'TON',
		  balance: (Number(contractState.balance) / 1e9).toFixed(2),
		},
	  ];
  
	  const jettons = await fetchJettons(client, walletAddress);
	  return [...currencies, ...jettons];
	} catch (error) {
	  console.error('Error fetching currencies for address:', address, error);
	  throw new Error('Failed to fetch currencies.');
	}
  }

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const address = searchParams.get('address')

	if (!address) {
		return NextResponse.json({ error: 'Address is required' }, { status: 400 })
	}

	try {
		const currencies = await fetchCurrencies(address)
		return NextResponse.json({ currencies })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch currencies' },
			{ status: 500 }
		)
	}
}
