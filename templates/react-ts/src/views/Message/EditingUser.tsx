import React, {Fragment, useCallback, useState} from "react";
import {Button, Input, List, Picker, DatePicker, ImageUploader, ImageUploadItem} from "antd-mobile";
import {useNavigate} from 'react-router-dom';
import {userModal} from "./UserInfoCard";
import avatar from '../../assets/images/avatar.png'
import {FormType} from "../../components/CommonFormModal";
import CommonNavBar from '../../components/CommonNavBar'
import dayjs from "dayjs";
import plus from "../../assets/images/plus.png";

const EditingUser: React.FC = () => {
    const navigate = useNavigate();
    const [editingInputInfo, setEditingInputInfo] = useState<any>({
        show: false,
        key: '',
        label: '',
        value: ''
    });
    const [userInfo, setUserInfo] = useState<any>({
        avatarUrl: '',
        name: '老陈',
        number: '222',
        age: '15',
        sex: '男'
    });
    const [pickerInfo, setPickerInfo] = useState<any>({
        visible: false,
        data: [[]]
    })
    const [fileList, setFileList] = useState<ImageUploadItem[]>([{
        key: '1',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        thumbnailUrl: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        extra: ''
    }])
    const [dateVisible, setDateVisible] = useState<boolean>(false)
    const labelRenderer = useCallback((type: string, data: number) => {
        switch (type) {
            case 'year':
                return data + '年'
            case 'month':
                return data + '月'
            case 'day':
                return data + '日'
            case 'hour':
                return data + '时'
            case 'minute':
                return data + '分'
            case 'second':
                return data + '秒'
            default:
                return data
        }
    }, [])

    const handlePickerClick = (data: any) => {

        const _data = data?.children?.map((item: any) => ({
            label: item.label,
            value: item.label
        }))
        setPickerInfo({
            visible: true,
            data: [_data]
        });
    }
    const handleUpload = (file: File) => {

        return {
            url: URL.createObjectURL(file),
        }
    }

    const renderUploaderAvatar = () => {
        return (
            <ImageUploader
                multiple={false}
                maxCount={1}
                value={fileList}
                onChange={setFileList}
                upload={handleUpload as any}
            >
                <div className='flex flex-col items-center justify-center w-[78px] h-[78px] my-[0.4rem] rounded-[6px] border border-[#D8D8D8] ml-[10px]'>
                    <img src={plus} alt="" className='mb-[4px]'/>
                    <span className='text-[#A2A2A2] text-[12px]'>添加照片</span>
                </div>
            </ImageUploader>
        )
    }
    const renderListItem = () => {
        return userModal.map(item => {
            switch (item.mobileType) {
                case FormType.INPUT:
                    return (
                        <List.Item className='text-base' key={item.label} extra={userInfo[item.key]} onClick={() => {
                            setEditingInputInfo({
                                show: true,
                                key: item.key,
                                label: item.mobileLabel
                            })
                        }}>
                            {item.mobileLabel}
                        </List.Item>
                    )
                case FormType.RADIO:
                    return (
                        <List.Item className='text-base' key={item.label} extra={userInfo[item.key]} onClick={() => { handlePickerClick(item) }}>
                            {item.mobileLabel}
                        </List.Item>
                    )
                case FormType.DATE_SELECT:
                    return (
                        <List.Item className='text-base' key={item.label} extra={userInfo[item.key]} onClick={() => setDateVisible(true) }>
                            {item.mobileLabel}
                        </List.Item>
                    )
                default:
                    return null
            }
        })
    }

    if(editingInputInfo.show) {
        const handleCancel = () => {
            setEditingInputInfo({
                show: false,
                key: '',
                label: '',
                value: ''
            })
        }
        const handleConfirm = () => {
            setUserInfo({
                ...userInfo,
                [editingInputInfo.key]: editingInputInfo.value
            })
            setEditingInputInfo({
                show: false,
                key: '',
                label: '',
                value: ''
            })
        }
        return (
            <Fragment>

                <div className='flex justify-between items-center mb-[12px] py-[8px] px-[15px] bg-[#fff] '>
                    <span className='!text-sm' onClick={() => handleCancel()}>取消</span>
                    <span className='text-lg font-medium'>{`设置${editingInputInfo.label}`}</span>
                    <Button className='flex items-center justify-center !text-sm h-[1.6rem]'  color='primary' onClick={() => handleConfirm()}>完成</Button>
                </div>
                <Input
                    style={{ background: '#fff' }}
                    className='h-[7vh] pl-[15px] text-base'
                    placeholder='请输入内容'
                    defaultValue={userInfo[editingInputInfo.key]}
                    value={editingInputInfo.value}
                    onChange={val => {
                        setEditingInputInfo({
                            ...editingInputInfo,
                            value: val
                        })
                    }}
                />
            </Fragment>
        )
    }
    return (
        <div className='bg-[#fff] h-[100vh]'>
            <CommonNavBar title='个人信息' onBack={() => navigate('/userInfo')}/>
            <div className='md:pt-[4rem]'>
                <List className='px-[15px]'>

                    <List.Item className='text-base' extra={renderUploaderAvatar()}>
                        头像
                    </List.Item>
                    {renderListItem()}
                </List>
            </div>
            <DatePicker
                visible={dateVisible}
                onClose={() => {
                    setDateVisible(false)
                }}
                min={new Date('1900/01/01')}
                max={new Date()}
                precision='day'
                title='选择年龄'
                renderLabel={labelRenderer}
                onConfirm={val => {
                    const birthDay = dayjs(val)
                    const currentDay = dayjs(new Date())
                    setUserInfo({
                        ...userInfo,
                        age: currentDay.diff(birthDay, 'year')
                    })
                }}
            />
            <Picker
                columns={pickerInfo.data}
                visible={pickerInfo.visible}
                onClose={() => setPickerInfo({
                    visible: false,
                    data: [[]]
                })}
                title='选择性别'
                value={userInfo.sex}
                onConfirm={v => {
                    setUserInfo({
                        ...userInfo,
                        sex: v[0]
                    })
                }}
            />
        </div>
    )
}

export default EditingUser;