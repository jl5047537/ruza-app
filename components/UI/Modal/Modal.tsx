import { ReactNode } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
	onClose: () => void
	children: ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				{children}
				<button className={styles.closeButton} onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	)
}

export default Modal
