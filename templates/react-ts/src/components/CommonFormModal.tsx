import React, {Fragment,useState} from "react";
import {Dayjs} from "dayjs";
import {Button, Modal, Form, Input, Radio, TimePicker, Upload} from 'antd'
import photo from "../assets/images/photo.png";

export enum FormType {
    INPUT = 'INPUT',
    RADIO = 'RADIO',
    TIME_RANGE = 'TIME_RANGE',
    SWITCH = 'SWITCH',
    TIME_INTERVAL = 'TIME_INTERVAL',
    UPLOAD = 'UPLOAD',
    DATE_SELECT='DATE_SELECT'
}
type CommonFormItem= {
    label: string;
    key: string;
    value?: string;
    type: FormType;
}
type InputForm = CommonFormItem & { placeholder: string };
type ComplexForm = CommonFormItem & { children: { id: string; label: string }[] };
interface CommonFormModalProps {
    open: boolean;
    close: () => void;
    formList: CommonFormItem[] | InputForm[] | ComplexForm[];
    title: string;
    onFinish: (values: any) => void
}
const CommonFormModal: (props: CommonFormModalProps) => React.JSX.Element = (props) => {
    const { open, close, formList, title, onFinish} = props
    const [timeStart, setTimeStart] = useState<string | string[]>('')
    const [timeEnd, setTimeEnd] = useState<string | string[]>('')

    const handleFinish = (values: any) => {
        const _values = { ...values }
        formList.forEach((item) => {
            if(item.type === 'TIME_RANGE') {
                _values[item.key] = `${timeStart} - ${timeEnd}`
            }
        })
        close()
        onFinish && onFinish(_values)
    }

    const onChangeTimeEnd = (date: Dayjs, dateString: string | string[]) => {
        setTimeEnd(dateString)
    }
    const onChangeTimeStart = (date: Dayjs, dateString: string | string[]) => {
        setTimeStart(dateString)
    }
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const renderFormItem = (list: CommonFormItem[]) => {
        return (
            <Fragment>
                {list.map((item) => {
                    switch (item.type) {
                        case 'INPUT':
                            return (
                                <Form.Item label={item.label} name={item.key} key={item.key}>
                                    <Input placeholder={(item as InputForm).placeholder}/>
                                </Form.Item>
                            )
                        case 'RADIO':
                            return (
                                <Form.Item label={item.label} name={item.key} key={item.key}>
                                    <Radio.Group>
                                        {(item as ComplexForm).children.map((_item) => (
                                            <Radio key={_item.id} value={_item.id}>{_item.label}</Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            )
                        case 'TIME_RANGE':
                            return (
                                <Form.Item label={item.label} name={item.key} key={item.key} className='flex items-center'>
                                    <TimePicker placeholder='' onChange={onChangeTimeStart} className='rounded-[1rem] w-[38%]' format='HH:mm'/>
                                    <span className='bg-[#b4c0ca] w-[0.8rem] h-[1px] my-0 mx-[4px]'/>
                                    <TimePicker placeholder='' onChange={onChangeTimeEnd} className='rounded-[1rem] w-[38%]' format='HH:mm' />
                                </Form.Item>
                            )
                        case 'UPLOAD':
                            return (
                                <Form.Item label={item.label} name={item.key} key={item.key} valuePropName="fileList" getValueFromEvent={normFile}>
                                    <Upload action="/upload.do" listType="picture-card" maxCount={1}>
                                        <button style={{border: 0, background: 'none'}} type="button">
                                            <img src={photo}  alt=''/>
                                        </button>
                                    </Upload>
                                </Form.Item>
                            )
                    }
                })}
            </Fragment>
        )
    }
    return (

        <Modal
            title={title}
            centered
            open={open}
            footer={() => null}
            onOk={() => close()}
            onCancel={() => close()}
        >
            <Form onFinish={handleFinish} className='pt-[25px] px-[15px]'>
                {renderFormItem(formList)}
                <Form.Item className='flex justify-end'>
                    <Button color="primary"  variant="outlined" className='mr-[10px]' onClick={() => close()}>取消</Button>
                    <Button type="primary" htmlType="submit" className='w-[6rem]'>保存</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CommonFormModal