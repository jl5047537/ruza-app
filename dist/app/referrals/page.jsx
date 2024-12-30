'use client';
import Content from '@/components/Content/Content';
import Header from '@/components/Header/Header';
import Preloader from '@/components/Preloader/Preloader';
import { useState } from 'react';
import styles from './Page.module.scss';
var HomePage = function () {
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var _b = useState(false), isWalletConnected = _b[0], setIsWalletConnected = _b[1];
    var _c = useState(false), isLoaded = _c[0], setIsLoaded = _c[1];
    var handleLoaded = function (loadedUser, walletConnected) {
        setUser(loadedUser);
        setIsWalletConnected(walletConnected);
        setIsLoaded(true);
    };
    if (!isLoaded) {
        return <Preloader onLoaded={handleLoaded}/>;
    }
    return (<div className={styles.home}>
			<Header />
			{user && <Content user={user} isWalletConnected={isWalletConnected}/>}
		</div>);
};
export default HomePage;
