import React, {Fragment, useState} from "react";
import {List, Picker, Switch} from 'antd-mobile'
import {Typography} from 'antd'
import styles from './message.module.scss';
import avatar from "../../assets/images/avatar.png";
import arrow from "../../assets/images/arrow_blue.png";
import {useNavigate} from 'react-router-dom';
import CommonFormModal, {FormType} from "../../components/CommonFormModal";
import SettingBlock from "./SettingBlock";
import CommonNavBar from "../../components/CommonNavBar";


export const userModal = [
    {
        label: '上传头像',
        mobileLabel: '头像',
        key: 'avatar',
        value: '',
        type: FormType.UPLOAD,
        mobileType: FormType.UPLOAD,
    },{
    label: '输入姓名',
    mobileLabel: '姓名',
    key: 'name',
    value: '',
    type: FormType.INPUT,
        mobileType: FormType.INPUT,
        placeholder: '请输入姓名'
},{
    label: '输入年龄',
    mobileLabel: '年龄',
    key: 'age',
    value: '',
    type: FormType.INPUT,
    mobileType: FormType.DATE_SELECT,
    placeholder: '请输入年龄'
},{
    label: '输入床号',
    mobileLabel: '床号',
    key: 'number',
    value: '',
    type: FormType.INPUT,
        mobileType: FormType.INPUT,
    placeholder: '请输入床号'
},{
    label: '选择性别',
    mobileLabel: '性别',
    key: 'sex',
    value: '',
    type: FormType.RADIO,
        mobileType: FormType.RADIO,
    children: [{
        id: '男',
        label: '男'
    },{
        id: '女',
        label: '女'
    }]
}]

const personalInfo = [{
    label: '床号',
    id: 'number',
    value: '01F'
}, {
    label: '性别',
    id: 'sex',
    value: '男'
}, {
    label: '年龄',
    id: 'age',
    value: '65'
}]

const machineType = [{
    label: '床垫类型',
    value: '智护'
},{
    label: 'MAC地址',
    value: '1A2C3E4D'
},{
    label: '设备校准',
    value: ''
}]
const createTimeNumber: (val: number) => { label: string; value: string }[] = (number) => {
    return new Array(number).fill(0).map((item, index) => {
        if(index < 9) {
            return ({
                label: `0${index}`,
                value: `0${index}`
            })
        }
        return ({
            label: `${index}`,
            value: `${index}`
        })
    })
}
const timeHour = createTimeNumber(24)
const timeMinutes = createTimeNumber(60)
const timeRangeColumns = [timeHour, timeMinutes,timeHour, timeMinutes]
const timeIntervalColumns = [['半小时', '一小时', '一个半小时'].map(item => ({
    label: item,
    value: item
}))]

interface UserInfoCardProps {
    outer?: boolean;
    isMobile?: boolean;
}
const UserInfoCard: (props: UserInfoCardProps) => React.JSX.Element = (props) => {
    const { outer = false, isMobile = false } = props;

    const navigate = useNavigate();
    const [isModifying, setIsModifying] = useState<boolean>(isMobile)
    const [userInfoOpen, setUserInfoOpen] = useState<boolean>(false)
    const [userExtraInfo, setUserExtraInfo] = useState<any>({
        name: '老陈',
        number: '01F',
        sex: '男',
        age: '65'
    })

    const [pickerInfo, setPickerInfo] = useState<any>({
        visible: false,
        title: '',
        columns: [],
        key: '',
        value: ''
    })
    const [formValue, setFormValue] = useState<Record<string, string | boolean>>({
        timeRangeA: '12:10 - 10:10',
        timeIntervalA: '30min',
        timeRangeB: '12:10 - 10:10',
        timeIntervalB: '30min',
        timeRangeC: '12:10 - 10:10',
        timeRangeD: '12:10 - 10:10',
        switchB: true,
        switchC: false,
        switchD: false,
    })

    const handleUserInfoForm = (values: any) => {
        console.log(values, 'values')
        setUserExtraInfo(values)
    }

    const handleClickListItem = (type: FormType, title: string, key: string) => {

        if(type === FormType.TIME_RANGE) {
            setPickerInfo({
                title,
                columns: timeRangeColumns,
                visible: true,
                key
            })
        } else {
            setPickerInfo({
                title,
                columns: timeIntervalColumns,
                visible: true,
                key
            })
        }
    }
    const renderListItem = (type: FormType, key: string, label: string, title: string = '') => {
        switch (type) {
            case FormType.SWITCH:
                return (
                    <List.Item key={key} extra={<Switch checked={formValue[key] as boolean} onChange={() => {
                        setFormValue({...formValue, [key]: !formValue[key]})
                    }}/>}>
                        {label}
                    </List.Item>
                )
            case FormType.TIME_RANGE:
            case FormType.TIME_INTERVAL:
                return (
                    <List.Item key={key} extra={formValue[key]} onClick={() => {
                        handleClickListItem(type, title, key)
                    }}>
                        {label}
                    </List.Item>
                )
            default:
                return null
        }
    }

    const renderMobileSetting = () => {
        return (
            <div className={['w-[96%] mx-auto', styles.mobileSettingContent].join(' ')}>
                <List header='翻身设置'>
                    {renderListItem(FormType.TIME_RANGE, 'timeRangeA', '设置时间段', '设置时间段')}
                    {renderListItem(FormType.TIME_INTERVAL, 'timeIntervalA', '翻身间隔', '设置翻身间隔')}
                </List>
                <List header='提醒设置'>
                    {renderListItem(FormType.SWITCH, 'switchB', '离床提醒')}
                    {formValue.switchB && renderListItem(FormType.TIME_RANGE, 'timeRangeB', '监测时间段', '设置监测时间段')}
                    {formValue.switchB && renderListItem(FormType.TIME_INTERVAL, 'timeIntervalB', '提醒时间', '设置提醒时间')}
                </List>
                <List className='mt-[10px]'>
                    {renderListItem(FormType.SWITCH, 'switchC', '坐起提醒')}
                    {formValue.switchC && renderListItem(FormType.TIME_RANGE, 'timeRangeC', '监测时间段', '设置监测时间段')}
                </List>
                <List className='mt-[10px]'>
                    {renderListItem(FormType.SWITCH, 'switchD', '坠床提醒')}
                    {formValue.switchD && renderListItem(FormType.TIME_RANGE, 'timeRangeD', '监测时间段', '设置监测时间段')}
                </List>
                <List header='设备类型'>
                    {machineType.map((item, index) => (
                        <List.Item key={item.label}>
                            <span className='flex items-center text-base'>
                                <span>{item.label}</span>
                                {index=== 1 ? (
                                    <Typography.Paragraph className='flex items-center h-full grow !my-0 justify-between ml-[1rem] text-base text-[#6C7784]' copyable={{
                                        icon: [<span>复制</span>]
                                    }}>{item.value}</Typography.Paragraph>
                                ) : (
                                    <span className='inline-block ml-[1rem]'>{item.value}</span>
                                )}
                            </span>
                        </List.Item>
                    ))}
                </List>

                <Picker
                    columns={pickerInfo.columns}
                    visible={pickerInfo.visible}
                    onClose={() => {
                        setPickerInfo({
                            visible: false,
                            title: '',
                            columns: [],
                            key: '',
                            value: ''
                        })
                    }}
                    title={pickerInfo.title}
                    value={pickerInfo.value}
                    onConfirm={v => {
                        const result = v.length > 1 ? `${v[0]}:${v[1]} - ${v[2]}:${v[3]}` : v[0]
                        setFormValue({
                            ...formValue,
                            [pickerInfo.key]: result
                        })
                    }}
                />
            </div>
        )
    }

    const handleClickUserEdit = () => {
        if(isMobile) {
            navigate('/userInfo_editing')
        } else {
            setUserInfoOpen(true)
        }
    }
    if (outer) {
        return (
            <div
                className='fixed top-[2.8rem] z-[9] w-full h-[6rem] bg-[#fff]'>
                <div className='flex items-end justify-between w-[90%] h-full py-[1.2rem] bg-[#fff] mx-auto border-b border-b-[#DCE3E9]'>
                    <img src={avatar} alt="" className='w-[4rem] mr-[1.2rem] rounded-[6px]'/>
                    <div className='flex flex-col justify-center grow'>
                        <span className='text-sm font-semibold'>{userExtraInfo.name}</span>
                        <span className='flex w-full'>
                        {[{label: 'braden', value: '低风险'}].map(item => (
                            <span key={item.label} className='text-sm text-[#6C7784]'>
                                <span>{`${item.label}:`}</span>
                                <span className='ml-[10px]'>{item.value}</span>
                            </span>
                        ))}
                    </span>
                    </div>
                    <img src={arrow} alt="" className='w-[8px] h-[12px] mb-[10px]'
                         onClick={() => navigate('/userInfo')}/>
                </div>
            </div>
        )
    }

    return (

        <Fragment>
            {isMobile && (
                <CommonNavBar title='个人信息及设置'  onBack={() => navigate('/')}/>
            )}
            <div className='md:pt-[4rem] h-full'>
                <div
                    className='bg-[#fff] rounded-[2px] pt-[1.2rem] pl-[1rem] pb-[1rem] md:w-[96%] md:mx-auto md:rounded-[10px]'>

                    <div className='flex items-center justify-between mb-[0.8rem]'>
                        <span className='text-base font-semibold'>个人信息</span>
                        {isModifying && <span className='text-[#0072EF] text-sm cursor-pointer mr-[10px]'
                                              onClick={() => {
                                                  handleClickUserEdit()
                                              }}>修改</span>}
                    </div>
                    <div className='flex'>
                        <img src={avatar} alt="" className='w-[4rem] mr-[1.2rem] rounded-[6px]'/>
                        <div className='flex flex-col justify-around md:justify-between'>
                            <span className='text-sm font-semibold'>{userExtraInfo.name}</span>
                            <span className='flex flex-wrap w-full'>
                                    {personalInfo.map(item => (
                                        <span key={item.id} className='text-sm w-[45%]'>
                                            <span className='text-[#929EAB]'>{`${item.label}:`}</span>
                                            <span className='ml-[10px]'>{userExtraInfo[item.id]}</span>
                                        </span>
                                    ))}
                                </span>
                        </div>
                    </div>
                </div>

                <div
                    className='flex justify-between bg-[#fff] rounded-[2px] md:rounded-[10px] h-[2.8rem] items-center my-[10px] mx-0 md:mx-auto p-[15px] text-sm md:w-[96%]'>
                        <span className='text-sm font-semibold'>
                            <span>Braden压疮风险评估</span>
                            <span className='text-[#EC6E38] ml-[10px]'>中度风险</span>
                        </span>
                    <span className='text-[#0072EF] cursor-pointer'>重新评估</span>
                </div>
                {!isMobile && <SettingBlock onModify={(value: boolean) => setIsModifying(value)}/>}
                {isMobile && renderMobileSetting()}
                <CommonFormModal
                    open={userInfoOpen}
                    close={() => setUserInfoOpen(false)}
                    formList={userModal}
                    onFinish={handleUserInfoForm}
                    title='个人信息设置'
                />
            </div>
        </Fragment>
    )
}

export default UserInfoCard