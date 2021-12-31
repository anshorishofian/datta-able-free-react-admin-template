import React, { useState, useEffect } from 'react';
// antd
import { Button, Alert, Skeleton, Divider, Space, Timeline } from 'antd'
import { DownloadOutlined, ClockCircleOutlined } from '@ant-design/icons'
// fetch data
import _Axios from "../../../services/_Axios";
// component

const TabHasil = (props) => {
    const { skb_submissions_id } = props
    const [datas, setDatas] = useState([]);
    const [logs, setLogs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadhis, setLoadhis] = useState(false);

    useEffect(() => {
        load();
        loadHistory();
    }, [])

    const load = () => {
        setLoading(true);
        _Axios.get(`admin/skb/submission/results/${skb_submissions_id}`)
            .then(async res => {
                await setDatas(res.data.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const loadHistory = () => {
        setLoadhis(true);
        _Axios.get(`admin/skb/submission/history/${skb_submissions_id}`)
            .then(res => {
                setLogs(res.data.data)
                setLoadhis(false)
            }).catch(err => {
                console.log(err)
                setLoadhis(false)
            })
    }

    const download = (url) => {
        window.open(url)
    }


    return (
        <>
            <Divider orientation='left'>Hasil Pengukuran</Divider>
            <Space>
                {loading ?
                    <Skeleton active={loading} />
                    :
                    <>
                        {datas.file_hasil_ukur !== undefined &&
                            <>
                                {datas.file_hasil_ukur.url ?
                                    <Button type='dashed' onClick={() => download(datas.file_hasil_ukur.url)} shape='round' icon={<DownloadOutlined />} size='large'> Hasil Pengukuran</Button>
                                    :
                                    <Button type='dashed' shape='round' icon={<DownloadOutlined />} disabled size='large'> Hasil Pengukuran</Button>
                                }
                                {datas.file_lampiran.url ?
                                    <Button danger onClick={() => download(datas.file_lampiran.url)} shape='round' icon={<DownloadOutlined />} size='large'> Lampiran</Button>
                                    :
                                    <Button danger shape='round' icon={<DownloadOutlined />} disabled size='large'> Lampiran</Button>
                                }

                            </>
                        }

                    </>
                }
            </Space>
            <Divider orientation='left'>History</Divider>
            {loadhis ?
                <Skeleton active={loadhis} paragraph={{ rows: 5 }} />
                :
                <>
                    {logs !== null &&
                        <Timeline mode='left'>
                            {logs.map((item, key) => (
                                <Timeline.Item dot={<ClockCircleOutlined />} key={key} label={item.created_at}>{item.text}</Timeline.Item>
                            ))}
                        </Timeline>
                    }
                </>
            }

        </>
    );

}

export default TabHasil;