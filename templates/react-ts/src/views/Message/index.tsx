import React, {Fragment} from "react";
import MenuLayouts from "../../layouts/MenuLayouts";
import styles from './message.module.scss'
import UserInfoCard from "./UserInfoCard";
import Monitor from "./Monitor";
import Nurse from './Nurse'
import Reporter from './Reporter'
import { Tabs, ConfigProvider } from 'antd'
import useWindowSize from "../../hooks/useWindowSize";
import CommonNavBar from "../../components/CommonNavBar";

const tabList = [{
    label: '监测',
    key: 'monitor',
    children: <Monitor/>
},{
    label: '护理',
    key: 'nurse',
    children: <Nurse />
},{
    label: '报告',
    key: 'reporter',
    children: <Reporter/>
}]
const TabTheme = {
    components: {
        Tabs: {
            inkBarColor: '#0072EF',
            itemSelectedColor: '#3D3D3D',
            itemColor: '#929EAB'
        },
    },
}

const Message = () => {

    const { isMobile } = useWindowSize()
    if(isMobile) {
        return (
            <Fragment>
                <CommonNavBar title='801' onBack={() => {}}/>
                <UserInfoCard outer isMobile/>

                <ConfigProvider
                    theme={TabTheme}
                >

                    <Tabs
                        className={[styles.mobileTabContent, styles.tabContent].join(' ')}
                        defaultActiveKey="nurse"
                        centered
                        items={tabList}
                    />
                </ConfigProvider>
            </Fragment>
        )
    }

    return (
        <MenuLayouts isMobile={isMobile}>
            <div className='flex ml-[15px] h-[calc(100vh-62px)] overflow-hidden'>
                <div className='w-[20%] mr-[15px]'>
                    <UserInfoCard />
                </div>
                <div className='w-[calc(80%-30px)] h-full'>
                    <ConfigProvider
                        theme={TabTheme}
                    >
                        <Tabs
                            className={styles.tabContent}
                            defaultActiveKey="nurse"
                            centered
                            items={tabList}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </MenuLayouts>
    )
}

export default Message