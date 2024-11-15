import React, {Fragment} from "react";
import logo from "../assets/images/logo.png";
import msg_icon from "../assets/images/msg_icon.png";

interface MenuLayoutProps {
    children: React.ReactNode;
    isMobile?: boolean;
}
const MenuLayouts: (props: MenuLayoutProps) => React.JSX.Element = (props) => {
    const { children, isMobile } = props
    if(isMobile) return <Fragment>{children}</Fragment>

    return (
        <div className='flex'>
            <div className='flex flex-col items-center w-[84px] h-[100vh] bg-[#DCE3E9]'>
                <img src={logo} alt="" className='w-[41px] m-[10px]'/>
                <span className='flex flex-col items-center w-full px-0 py-[20px] bg-[#0072EF] text-[#fff]'>
                <img src={msg_icon} alt="" className='w-[33px]' />
                <span>消息</span>
            </span>
            </div>
            <div className='w-[calc(100%-84px)]'>
                <div className='flex items-center bg-[#fff] h-[52px] w-[calc(100vw-84px)] mb-[10px]'>
                    <span className='text-[#0072EF] my-0 mx-[20px] font-semibold text-[20px]'>工作台</span>
                    <span className='w-[2px] h-[41%] bg-[#bfbfbf] mr-[15px]' />
                    <span className='text-base font-semibold'>韩群涛</span>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MenuLayouts;