import { useState, useCallback , createContext } from 'react';
import { Color } from '@material-ui/lab/Alert';

export type Toast = {
    open: boolean, 
    message: string, 
    color : Color,
}

export type Toaster = {
    toast: Toast,
    show: (message: string, color: Color) => void,
    hide: () => void,
}

export const ToastContext = createContext<Toaster>({
    toast: {
        open: false, 
        message: '', 
        color: 'info',
    },
    show: ()=>{},
    hide: ()=>{}
});

export default function ToastContextProvider( props : any ){

    const [toast, setToast] = useState<Toast>({
        open: false, 
        message: '', 
        color: 'info',
    });

    const showToast = (message: string, color: Color = 'info') => {
        setToast({ 
            open: true, 
            message, 
            color
        });
    };

    const hideToast = () => {
        setToast({
            open: false, 
            message: toast.message, 
            color: toast.color,
        });
    };

    const toaster : Toaster = {
         toast, 
         show: useCallback((message: string, color: Color) => showToast(message, color), []) , 
         hide: hideToast , 
    };

    return (
        <ToastContext.Provider value={toaster}>
            {props.children}
        </ToastContext.Provider>
    );
}