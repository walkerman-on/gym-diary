import { useEffect, useState } from "react";

interface IUseInstallAppReturn {
	installMessage: boolean
}

export const useInstallApp = (): IUseInstallAppReturn => {
	const [showInstallMessage, setShowInstallMessage] = useState(false);

	const isIos = () => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		return /iphone|ipad|ipod/.test(userAgent);
	};

	const isInStandaloneMode = () => {
		return ('standalone' in window.navigator) && (window.navigator.standalone);
	};

	useEffect(() => {
		if (isIos() && !isInStandaloneMode()) {
			setShowInstallMessage(true);
		}
	}, []);

	return { installMessage: showInstallMessage }

}