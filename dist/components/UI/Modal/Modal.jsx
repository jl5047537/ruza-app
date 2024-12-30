import styles from './Modal.module.scss';
var Modal = function (_a) {
    var onClose = _a.onClose, children = _a.children;
    return (<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modal} onClick={function (e) { return e.stopPropagation(); }}>
				{children}
				<button className={styles.closeButton} onClick={onClose}>
					✕
				</button>
			</div>
		</div>);
};
export default Modal;
