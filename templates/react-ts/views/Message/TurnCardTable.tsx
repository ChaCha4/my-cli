import React from "react";
import CommonTitle from '../../components/CommonTitle'
import { Table} from "antd";

interface CardItem {
    label: string;
    value: number;
    unit: string;
}
const turnAroundCard: CardItem[] = [{
    label: '翻身次数',
    value: 9,
    unit: '次/10次'
},{
    label: '有效翻身',
    value: 8,
    unit: '次/分'
},{
    label: '翻身超时',
    value: 1,
    unit: '次'
}]
const turnTableDatasource: {[key: string]: unknown}[] = [{
    key: '1',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: true,
    right: false,
    nurser: '张爱铃',
},{
    key: '2',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: true,
    right: false,
    nurser: '张爱铃',
},{
    key: '3',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: false,
    right: true,
    nurser: '张爱铃',
},{
    key: '4',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: true,
    right: false,
    nurser: '张爱铃',
},{
    key: '5',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: false,
    right: true,
    nurser: '张爱铃',
},{
    key: '6',
    plan: '08:00',
    actual_exa: '08:01',
    left: true,
    top: false,
    right: false,
    nurser: '张爱铃',
},{
    key: '7',
    plan: '08:00',
    actual_exa: '08:01',
    left: false,
    top: false,
    right: true,
    nurser: '张爱铃',
}]
interface TurnCardTableProps {
    isMobile?: boolean;
}
const TurnCardTable: (props: TurnCardTableProps) => React.JSX.Element = (props) => {
    const { isMobile = false } = props;


    const commonClass = 'inline-block w-[20px] h-[20px] md:w-[12px] md:h-[12px] rounded-full'
    const turnTableColumns = [{
        title: '翻身计划',
        dataIndex: 'plan',
        key:'plan',
        with: 40,
    },{
        title: '实际执行',
        dataIndex: 'actual_exa',
        key:'actual_exa',
        with: 40,
    },{
        title: '左侧卧',
        dataIndex: 'left',
        key:'left',
        with: 40,
        render: (text: boolean) => {
            if(text) {
                return <span className={['bg-[#6C7784]', commonClass].join(' ')}/>
            } else {
                return <span className={['bg-[#fff] border border-[#D1D9E1]', commonClass].join(' ')}/>
            }
        }
    },{
        title: '仰卧',
        dataIndex: 'top',
        key:'top',
        with: 40,
        render: (text: boolean) => {
            if(text) {
                return <span className={['bg-[#6C7784]', commonClass].join(' ')}/>
            } else {
                return <span className={['bg-[#fff] border border-[#D1D9E1]', commonClass].join(' ')}/>
            }
        }
    },{
        title: '右侧卧',
        dataIndex: 'right',
        key:'right',
        with: 40,
        render: (text: boolean) => {
            if(text) {
                return <span className={['bg-[#6C7784]', commonClass].join(' ')}/>
            } else {
                return <span className={['bg-[#fff] border border-[#D1D9E1]', commonClass].join(' ')}/>
            }
        }
    },{
        title: '护理员',
        dataIndex: 'nurser',
        key:'nurser',
        with: 100,
        render: (text: string) => <span className='whitespace-nowrap'>{text}</span>
    }]

    return (

        <div className='bg-[#fff] md:w-[94%] md:rounded-[10px] md:my-[10px] md:mx-auto p-[25px] md:p-[1rem]'>
            <CommonTitle name='翻身卡' type={isMobile ? 'rect' : 'square'} />
            <div className='flex px-[30px] pb-[30px] md:pb-[1rem] w-full justify-between'>
                {turnAroundCard.map((item, index) => (
                    <div
                        key={item.label}
                        className={`flex ${index !== turnAroundCard.length - 1 && 'w-[28%]'} shrink-0 items-center justify-between`}>
                        <div className='flex flex-col'>
                            <span className='text-[#929EAB] md:text-[#3E444C] text-sm font-medium'>{item.label}</span>
                            <span>
                                <span className='text-[#32373E] font-semibold text-2xl'>{item.value}</span>
                                <span className='text-sm text-[#929EAB] md:text-[#6C7784] ml-[2px]'>{item.unit}</span>
                            </span>
                        </div>
                        {(index !== turnAroundCard.length - 1 && !isMobile) &&
                            <span className='w-[2px] h-[41%] bg-[#bfbfbf] mr-[15px]'/>}
                    </div>
                ))}
            </div>
            <Table
                rowKey="key"
                rowHoverable={false}
                columns={turnTableColumns}
                dataSource={turnTableDatasource}
                pagination={false}
                rowClassName='darkRow'
                scroll={!isMobile ? {y: 385}: {x: 150}}/>
        </div>
    )
}

export default TurnCardTable;