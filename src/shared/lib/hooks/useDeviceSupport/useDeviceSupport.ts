import { useEffect, useState } from "react";

interface IUseDeviceSupportReturn {
	isMobile: boolean
}
export const useDeviceSupport = (): IUseDeviceSupportReturn => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkMobileDevice = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobileDevice();

		window.addEventListener('resize', checkMobileDevice);

		return () => {
			window.removeEventListener('resize', checkMobileDevice);
		};
	}, []);

	return { isMobile }
}