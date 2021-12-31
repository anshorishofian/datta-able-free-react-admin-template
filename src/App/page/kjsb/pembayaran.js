import React, { useState, useEffect } from 'react';
// antd
import { Button, message, Alert, Skeleton, Divider, Tag } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
// fetch data
import _Axios from "../../../services/_Axios";
// component

const TabPembayaran = (props) => {
    const { transactions_id, skb_submissions_id } = props
    const [datas, setDatas] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, [])

    const load = () => {
        setLoading(true);
        _Axios.get(`admin/skb/submission/pembayaran/${transactions_id}`)
            .then(res => {
                setDatas(res.data.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const download = () => {
        message.loading({ content: 'Loading...', key :'updatable' });
        _Axios.get(`admin/skb/submission/invoice/${skb_submissions_id}`)
            .then(res => {
                // setDatas(res.data.data)
                // setLoading(false)
                window.open(res.data.data.link)
                console.log(res.data.data)
                message.success({ content: 'File berhsail di download!', key :'updatable' })
            }).catch(err => {
                console.log(err)
                message.error({ content: 'File gagal di download!', key :'updatable' })
            })
    }

    const status = (status) => {
        switch (status) {
            case "PENDING":
                return <Tag color='warning'>PENDING</Tag>
                break;
            case 'PAID':
                return <Tag color='success'>PAID</Tag>
                break;
            case 'REJECTED':
                return <Tag color='red'>REJECTED</Tag>
                break;
            default:
                return <Tag color='red'>UNKNOWN</Tag>
        }
    }

    return (
        <>
            {loading
                ?
                <Skeleton active={true} paragraph={{ rows: 5 }} />
                :
                <>
                    {!datas ?
                        <Alert
                            message="Error"
                            description="Belum Ada Data Pembayaran!."
                            type="error"
                            showIcon
                            closable
                        />
                        :
                        <>
                            <dl className="dl-horizontal row">
                                <dt className="col-sm-3">No. Invoice</dt>
                                <dd className="col-sm-9">: {datas.external_id}</dd>

                                <dt className="col-sm-3">Bank</dt>
                                <dd className="col-sm-9">: {datas.bank_code}</dd>

                                <dt className="col-sm-3">Amount</dt>
                                <dd className="col-sm-9">: Rp. {datas.amount} </dd>

                                <dt className="col-sm-3">Type Pembayaran</dt>
                                <dd className="col-sm-9">: {datas.type}</dd>

                                <dt className="col-sm-3">Status Pembayaran</dt>
                                <dd className="col-sm-9">: {status(datas.status)}</dd>

                                <dt className="col-sm-3">Tgl. Pembayaran</dt>
                                <dd className="col-sm-9">: {datas.payment_date}</dd>

                            </dl>
                        </>
                    }
                    <Divider />
                    <Button type='dashed' onClick={() => download()} shape='round' icon={<DownloadOutlined />} size='large'> Invoice</Button>
                </>

            }

        </>
    );

}

export default TabPembayaran;