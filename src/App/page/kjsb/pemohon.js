import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from "../../../App/components/MainCard";
// antd
import { Avatar, Typography, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons';
// fetch data
import _Axios from "../../../services/_Axios";

const { Title, Text } = Typography;

const Pemohon = (props) => {
    const { skb, title, type } = props;
    const [datas, setDatas] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (type == 'pemohon') {
            load(skb.applicant_id);
        } else {
            load(skb.transactions[0] ? skb.transactions[0].surveyor_id : null);
        }
    }, [])

    const load = (id) => {
        setLoading(true);
        _Axios.get(`admin/user/detail/${id}`)
            .then(res => {
                setDatas(res.data.data)
                setLoading(false)
                // console.log(res.data.data)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }


    return (
        <Card title={title} isOption>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                {loading ?
                    <>
                        <Skeleton.Avatar active={loading} size={150} shape='circle' />
                        <Skeleton active={loading} paragraph={{rows : 2}} />
                    </>
                    :
                    <>
                        <Avatar src={datas ? datas.user_profile.foto_user_thumb : '#'} size={150}></Avatar>
                        <Title level={5} style={{ marginTop: 10 }}>{datas ? datas.nama : '-'}</Title>
                        <Text strong style={{ fontSize: 12 }}>{datas ? datas.email : '-'}</Text>
                    </>
                }
            </div>
        </Card>
    );

}

export default Pemohon;