'use client';
import useStore from '@/lib/store/store';
import ConnectIcon from '@/public/Icons/ConnectIcon';
import RuzaIcon from '@/public/Icons/RuzaIcon';
import TelegramIcon from '@/public/Icons/TelegramIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Page.module.scss';
import { BOT_NAME } from '@/lib/utils/consts';
export default function AuthPage() {
    var _a = useState(''), message = _a[0], setMessage = _a[1];
    var router = useRouter();
    var setAuthentication = useStore().setAuthentication;
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
                setAuthentication(true, urlToken, null);
                router.push('/');
            }
            else {
                setMessage('Добро пожаловать в RuZa! Вы не авторизованы или ваша сессия подошла к концу, для продолжения требуется войти.');
            }
        }
    }, [router, setAuthentication]);
    var telegramLoginUrl = "https://telegram.me/".concat(BOT_NAME, "?start=auth");
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
