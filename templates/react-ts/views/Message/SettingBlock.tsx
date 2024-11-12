import React, { useState} from "react";
import CommonFormModal, {FormType} from "../../components/CommonFormModal";
import {Button, Switch} from "antd";
import styles from "./message.module.scss";

interface SettingBlockProps {
    onModify: (value: boolean) => void
}

const SettingBlock: (props: SettingBlockProps) => React.JSX.Element = (props) => {
    const {onModify} = props
    // TODO:合并成一个state对象
    const [editing, setEditing] = useState<boolean>(false);
    const [timeRangeA, setTimeRangeA] = useState<string>('12:10 - 10:10')
    const [timeIntervalA, setTimeIntervalA] = useState<string>('30min')
    const [timeIntervalB, setTimeIntervalB] = useState<string>('10:10 - 10:10')
    const [timeRangeB, setTimeRangeB] = useState<string>('3min')
    const [timeRangeC, setTimeRangeC] = useState<string>('10:10 - 10:10')
    const [timeRangeD, setTimeRangeD] = useState<string>('10:10 - 10:10')
    const [switchA, setSwitchA] = useState<boolean>(true)
    const [switchB, setSwitchB] = useState<boolean>(true)
    const [switchC, setSwitchC] = useState<boolean>(true)
    const [switchD, setSwitchD] = useState<boolean>(false)
    const [timeAModalOpen, setTimeAModalOpen] = useState<boolean>(false)
    const [intervalAModalOpen, setIntervalAModalOpen] = useState<boolean>(false)
    const [intervalBModalOpen, setIntervalBModalOpen] = useState<boolean>(false)
    const [timeBModalOpen, setTimeBModalOpen] = useState<boolean>(false)
    const [timeCModalOpen, setTimeCModalOpen] = useState<boolean>(false)
    const [timeDModalOpen, setTimeDModalOpen] = useState<boolean>(false)
    const settings = [{
        label: '翻身设置',
        id: 'turn_over_switch',
        value: switchA,
        handleSwitch: () => {
            setSwitchA(!switchA)
        },
        params: [{
            label: '设置时间段',
            id: 'timeRangeA',
            value: timeRangeA,
            onChange: () => {
                setTimeAModalOpen(true)
            },
            modal: <CommonFormModal
                title='翻身设置'
                open={timeAModalOpen}
                close={() => setTimeAModalOpen(false)}
                formList={[{
                    label: '设置时间段',
                    key: 'timeRangeA',
                    value: '',
                    type: FormType.TIME_RANGE,
                }]}
                onFinish={(values) => {
                    setTimeRangeA(values.timeRangeA)
                }}
            />
        }, {
            label: '翻身间隔',
            id: 'timeIntervalA',
            onChange: () => {
                setIntervalAModalOpen(true)
            },
            value: timeIntervalA,
            modal: <CommonFormModal
                title='翻身设置'
                open={intervalAModalOpen}
                close={() => setIntervalAModalOpen(false)}
                formList={[{
                    label: '设置翻身间隔',
                    key: 'timeIntervalA',
                    value: '',
                    type: FormType.RADIO,
                    children: [{
                        id: '1小时',
                        label: '1小时'
                    }, {
                        id: '2小时',
                        label: '2小时'
                    }, {
                        id: '3小时',
                        label: '3小时'
                    }, {
                        id: '4小时',
                        label: '4小时'
                    }]
                }]}
                onFinish={(values) => {
                    setTimeIntervalA(values.timeIntervalA)
                }}
            />
        }]
    }, {
        label: '离床提醒设置',
        id: 'turn_over_switch',
        value: switchB,
        handleSwitch: () => {
            setSwitchB(!switchB)
        },
        params: [{
            label: '监测时间段',
            id: 'timeRangeB',
            value: timeRangeB,
            onChange: () => {
                setTimeBModalOpen(true)
            },
            modal: <CommonFormModal
                title='离床提醒设置'
                open={timeBModalOpen}
                close={() => setTimeBModalOpen(false)}
                formList={[{
                    label: '监测时间段',
                    key: 'timeRangeB',
                    value: '',
                    type: FormType.TIME_RANGE,
                }]}
                onFinish={(values) => {
                    setTimeRangeB(values.timeRangeB)
                }}
            />
        }, {
            label: '提醒时间',
            id: 'timeIntervalB',
            value: timeIntervalB,
            onChange: () => {
                setIntervalBModalOpen(true)
            },
            modal: <CommonFormModal
                title='离床提醒设置'
                open={intervalBModalOpen}
                close={() => setIntervalBModalOpen(false)}
                formList={[{
                    label: '提醒时间',
                    key: 'timeIntervalB',
                    value: '',
                    type: FormType.RADIO,
                    children: [{
                        id: '1小时',
                        label: '1小时'
                    }, {
                        id: '2小时',
                        label: '2小时'
                    }, {
                        id: '3小时',
                        label: '3小时'
                    }, {
                        id: '4小时',
                        label: '4小时'
                    }]
                }]}
                onFinish={(values) => {
                    setTimeIntervalB(values.timeIntervalB)
                }}
            />
        }]
    }, {
        label: '坐起提醒设置',
        id: 'turn_over_switch',
        value: switchC,
        handleSwitch: () => {
            setSwitchC(!switchC)
        },
        params: [{
            label: '监测时间段',
            id: 'timeRangeC',
            value: timeRangeC,
            onChange: () => {
                setTimeCModalOpen(true)
            },
            modal: <CommonFormModal
                title='坐起提醒设置'
                open={timeCModalOpen}
                close={() => setTimeCModalOpen(false)}
                formList={[{
                    label: '监测时间段',
                    key: 'timeRangeC',
                    value: '',
                    type: FormType.TIME_RANGE,
                }]}
                onFinish={(values) => {
                    setTimeRangeC(values.timeRangeC)
                }}
            />
        }]
    }, {
        label: '坠床提醒设置',
        id: 'turn_over_switch',
        value: switchD,
        handleSwitch: () => {
            setSwitchD(!switchD)
        },
        params: [{
            label: '监测时间段',
            id: 'timeRangeD',
            value: timeRangeD,
            onChange: () => {
                setTimeDModalOpen(true)
            },
            modal: <CommonFormModal
                title='坠床提醒设置'
                open={timeDModalOpen}
                close={() => setTimeDModalOpen(false)}
                formList={[{
                    label: '监测时间段',
                    key: 'timeRangeD',
                    value: '',
                    type: FormType.TIME_RANGE,
                }]}
                onFinish={(values) => {
                    setTimeRangeD(values.timeRangeD)
                }}
            />
        }]
    }]
    const machineType = [{
        label: '床垫类型',
        value: '智护'
    }, {
        label: 'MAC地址',
        value: '1A2C3E4D'
    }, {
        label: '设备校准',
        value: ''
    }]

    const handleClickSettingBtn = () => {
        setEditing(true)
        onModify(true)
    }

    const handleSettingCompleted = () => {
        setEditing(false)
        onModify(false)
    }

    const renderFooterBtn = () => {
        return editing ?
            <Button type="primary" className='w-full rounded-[2px]'
                    onClick={handleSettingCompleted}>确认设置</Button> : (
                <span className='cursor-pointer text-sm text-[#0072EF] ml-[20px]'
                      onClick={handleClickSettingBtn}>设置</span>)
    }

    return (
        <div className='overflow-scroll h-[calc(100%-13rem)]'>
            {settings.map((item) => (
                <div className='bg-[#fff] mb-[10px] py-[0.5rem] px-[0.8rem]'
                     key={item.label}>
                    <div className='flex items-center justify-between'>
                        <span className='text-base font-semibold'>{item.label}</span>
                        {editing && <Switch size="small" checked={item.value} onClick={() => item.handleSwitch()}/>}
                    </div>
                    {item.value && item.params.map((_item, index) => (

                        <div className='flex items-center w-full mt-[0.4rem] h-[2rem]' key={_item.label}>
                            <div className='text-sm text-[#32373E] w-[5rem]'>{_item.label}</div>
                            <div
                                className={`flex justify-between items-center h-full text-base ${index !== (item.params.length - 1) && 'border-b border-b-[#DCE3E9]'} p-[5px] w-[calc(100%-5rem)]`}>
                                <span className='text-[#6C7784]'>{_item.value}</span>
                                {editing && <span className='text-sm text-[#0072EF] cursor-pointer'
                                                  onClick={() => _item.onChange()}>修改</span>}
                            </div>
                            {_item.modal}
                        </div>
                    ))}
                </div>
            ))}

            <div className='bg-[#fff] mb-[10px] pt-[10px] pl-[0.9rem]'>
                <span className='text-base inline-block font-semibold'>设备类型</span>
                <div>
                    {machineType.map(item => (
                        <div className={[styles.rowItem, 'text-sm'].join(' ')} key={item.label}>
                            <span className='mr-[2rem]'>{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            {renderFooterBtn()}
        </div>
    )
}

export default SettingBlock;