import { useMediaQuery } from 'react-responsive'

const useMedia = () => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 1224px)'
    });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const isTabletOrMobileDevice = useMediaQuery({
      query: '(max-device-width: 1224px)'
    });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    return {
        isDesktopOrLaptop,
        isTablet: isTabletOrMobile && !isMobile,
        isMobile,
        isDevice: isTabletOrMobileDevice,
        isPortrait,
        isRetina
    }
}

export default useMedia;