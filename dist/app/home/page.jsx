'use client';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Content from '@/components/Content/Content';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './Page.module.scss';
var HomePage = function () {
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var router = useRouter();
    useEffect(function () {
        var token = localStorage.getItem('jwt');
        if (!token) {
            router.push('/auth');
            return;
        }
        fetch('/api/auth/me', {
            headers: { Authorization: "Bearer ".concat(token) },
        })
            .then(function (res) {
            if (!res.ok) {
                localStorage.removeItem('jwt');
                router.push('/auth');
                return null;
            }
            return res.json();
        })
            .then(function (data) {
            if (data === null || data === void 0 ? void 0 : data.user) {
                setUser(data.user);
            }
        })
            .catch(function (error) {
            console.error('Error during user fetch:', error);
        });
    }, [router]);
    if (!user) {
        return (<div className={styles.loading}>
				<p>Загрузка...</p>
			</div>);
    }
    var ErrorBoundary = /** @class */ (function (_super) {
        __extends(ErrorBoundary, _super);
        function ErrorBoundary(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { hasError: false };
            return _this;
        }
        ErrorBoundary.getDerivedStateFromError = function (_) {
            return { hasError: true };
        };
        ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
            console.log('Error caught by boundary:', error, errorInfo);
        };
        ErrorBoundary.prototype.render = function () {
            if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }
            return this.props.children;
        };
        return ErrorBoundary;
    }(React.Component));
    return (<ErrorBoundary>
			<div className={styles.home}>
				<Header />
				<Content user={user}/>
			</div>
		</ErrorBoundary>);
};
export default HomePage;
