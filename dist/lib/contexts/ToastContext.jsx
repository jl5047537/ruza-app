'use client';
import React, { createContext, useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
var ToastContext = createContext(undefined);
var toasterConfig = {
    position: 'top-center',
    toastOptions: {
        className: '',
        style: {
            background: '#000000',
            color: '#fff',
            border: '1px solid #22222250',
        },
        success: {
            iconTheme: {
                primary: '#00ffa3',
                secondary: '#000000',
            },
        },
        error: {
            iconTheme: {
                primary: '#ff4848',
                secondary: '#000000',
            },
        },
    },
};
export var ToastProvider = function (_a) {
    var children = _a.children;
    var showToast = function (message, type) {
        if (type === 'success') {
            toast.success(message);
        }
        else {
            toast.error(message);
        }
    };
    return (<ToastContext.Provider value={{ showToast: showToast }}>
			{children}
			<Toaster {...toasterConfig}/>
		</ToastContext.Provider>);
};
export var useToast = function () {
    var context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context.showToast;
};
