'use client';
import ConnectIcon from '@/public/Icons/ConnectIcon';
import RuzaIcon from '@/public/Icons/RuzaIcon';
import TelegramIcon from '@/public/Icons/TelegramIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Page.module.scss';
export default function AuthPage() {
    var _a = useState(''), message = _a[0], setMessage = _a[1];
    var router = useRouter();
    var authBotName = 'RuZaAuthBot';
    useEffect(function () {
        var token = localStorage.getItem('jwt');
        if (token) {
            setMessage('Вы уже авторизованы. Вернитесь на главную страницу.');
            router.push('/');
        }
        else {
            var params = new URLSearchParams(window.location.search);
            var urlToken = params.get('token');
            if (urlToken) {
                localStorage.setItem('jwt', urlToken);
                router.push('/');
            }
            else {
                setMessage('Добро пожаловать в RuZa! Вы не авторизованы или ваша сессия подошла к концу, для продолжения требуется войти.');
            }
        }
    }, [router]);
    var telegramLoginUrl = "https://telegram.me/".concat(authBotName, "?start=auth");
    return (<div className={styles.auth}>
			<div className={styles.blockAuth}>
				<div className={styles.iconAuth}>
					<div>
						<RuzaIcon />
					</div>
					<div className={styles.connectIcon}>
						<ConnectIcon />
					</div>
					<div>
						<TelegramIcon />
					</div>
				</div>
				<h1>Авторизация через Telegram</h1>
				<p>{message}</p>
				<a href={telegramLoginUrl}>
					<button>Войти</button>
				</a>
				<a href='/' className={styles.userSucces}>
					Пользовательское соглашение
				</a>
			</div>
		</div>);
}
