import { faCheckCircle, faCircleInfo, faMessage, faTriangleExclamation, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { cssTransition, Slide, toast, ToastOptions } from "react-toastify"

const CustomSlide = cssTransition({
    enter: 'animate-slide-in',
    exit: 'animate-slide-out'
});

const defaultToastOptions: ToastOptions = {
    type: 'error',
    position: 'bottom-right',
    hideProgressBar: true,
    transition: Slide,
    icon: ({theme, type}): ReactNode | undefined => {
        if (type == 'error') return <FontAwesomeIcon icon={faXmarkCircle} className="fa-fw"/>;
        if (type == 'default') return <FontAwesomeIcon icon={faMessage} className="fa-fw"/>;
        if (type == 'info') return <FontAwesomeIcon icon={faCircleInfo} className="fa-fw"/>;
        if (type == 'success') return <FontAwesomeIcon icon={faCheckCircle} className="fa-fw"/>
        if (type == 'warning') return <FontAwesomeIcon icon={faTriangleExclamation} className="fa-fw"/>
    }
}

export function sendToast(content: string, options?: ToastOptions) {
    toast(content, {
        ...defaultToastOptions, ...options
    });
}
