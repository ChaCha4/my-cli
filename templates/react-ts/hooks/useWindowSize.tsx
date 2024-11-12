import {useEffect, useState} from "react";

function useWindowSize () {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1300)

    const browserResized = () => {
        // TODO: 平板算 移动端？PC端？
        setIsMobile(window.innerWidth <= 1300);

        // TODO:按需选择放开注释
        let width = window.innerWidth < 600 ? 'phone' : window.innerWidth < 999 ? 'pad' : window.innerWidth < 1500 ? 'Pad' : 'pc'

        if (width == 'pc') {
            document.documentElement.style.fontSize = `${window.innerWidth / 100}px`;
        } else if (width === 'pad') {
            // document.documentElement.style.fontSize = `${window.innerWidth / 45}px`;
        } else if (width === 'Pad') {
            document.documentElement.style.fontSize = `${window.innerWidth / 100}px`;
        } else {
            // document.documentElement.style.fontSize = `${window.innerWidth / 30}px`;
        }
    }

    useEffect(() => {
        browserResized()
        window.addEventListener("resize", browserResized);
        return () => {
            window.removeEventListener("resize", browserResized);
        }
    },[])

    return {
        isMobile
    };
}

export default useWindowSize