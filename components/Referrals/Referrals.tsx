import styles from './Referrals.module.scss'

const Referrals = () => {
	const countRef = 1

	return (
		<div className={styles.referralsModule}>
			<div className={styles.blockName}>Подлюченные рефералы</div>
			<div className={styles.blockReferrals}>
				<div className={styles.leftAndRight}>
					<div className={styles.left}>
						<p className={styles.p}>Ближний круг рефералов</p>
						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${countRef * 25}%` }}
							></div>
							<p className={styles.countRef}>{countRef} из 4</p>
						</div>
					</div>
					<div className={styles.right}>
						<p className={styles.p}>Всего рефералов</p>
						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${countRef * 25}%` }}
							></div>
							<p className={styles.countRef}>{`${countRef * 25}%`}</p>
						</div>
					</div>
				</div>
				<div className={styles.circleReferrals}>
					<div className={styles.left}>
						<p className={styles.p}>Ближний круг рефералов</p>
						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 1) * 25}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 1} из 4</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
					</div>
					<div className={styles.center}>
						<p className={styles.p}>2-ой круг рефералов</p>
						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 4) * (100/16)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 4} из 16</p>
						</div>

						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 15) * (100/16)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 15} из 16</p>
						</div>

						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 11) * (100/16)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 11} из 16</p>
						</div>

						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
					</div>
					<div className={styles.right}>
						<p className={styles.p}>3-ий круг рефералов</p>
						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 6) * (100/64)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 6} из 64</p>
						</div>

						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 51) * (100/64)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 51} из 64</p>
						</div>

						<div className={styles.progressBar}>
							<div
								className={styles.valueProgressBar}
								style={{ width: `${(countRef + 27) * (100/64)}%` }}
							></div>
							<p className={styles.countRef}>{countRef + 27} из 64</p>
						</div>

						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
						<div className={styles.progressBarUser}>
							<div
								className={styles.valueProgressBarUser}
								style={{ width: `0%` }}
							></div>
							<p className={styles.countRefUser}>Нет данных</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Referrals
