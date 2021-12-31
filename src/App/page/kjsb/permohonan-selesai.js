import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux"
import Card from "../../components/MainCard";
// antd
import { List, Avatar, Button, Skeleton, Tag } from 'antd'
// fetch data
import _Axios from "../../../services/_Axios";
import { SUBMISSION_STATUS } from '../../../services/skb.const';
import { Link } from 'react-router-dom';

const Permohonan = (props) => {
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        load();
    }, [])

    const load = () => {
        setLoading(true);
        _Axios.post(`admin/skb/submission/lists-by-status`,{status : 3})
            .then(res => {
                setDatas(res.data.data)
                setLoading(false)
                console.log(res)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const status = (status) => {
        switch (status) {
            case SUBMISSION_STATUS.DRAF:
                return <Tag color='cyan'>DRAF</Tag>
                break;
            case SUBMISSION_STATUS.TAGGING_LOCATION:
                return <Tag color='cyan'>TAGING LOCATION</Tag>
                break;
            case SUBMISSION_STATUS.FIND_SURVEYOR:
                return <Tag color='cyan'>FIND SURVEYOR</Tag>
                break;
            case SUBMISSION_STATUS.VERIFY_BY_SUERVEYOR:
                return <Tag color='cyan'>VERIFY_BY_SUERVEYOR</Tag>
                break;
            case SUBMISSION_STATUS.WAITING_PAYMENT:
                return <Tag color='cyan'>WAITING_PAYMENT</Tag>
                break;
            case SUBMISSION_STATUS.PAYMENT_GETWAY_CREATED:
                return <Tag color='cyan'>PAYMENT_GETWAY_CREATED</Tag>
                break;
            case SUBMISSION_STATUS.WAIT_SCHADULED:
                return <Tag color='cyan'>WAIT_SCHADULED</Tag>
                break;
            case SUBMISSION_STATUS.WAIT_APPROVE_SCHADULED:
                return <Tag color='cyan'>WAIT_APPROVE_SCHADULED</Tag>
                break;
            case SUBMISSION_STATUS.SHARE_LOCATION:
                return <Tag color='cyan'>SHARE_LOCATION</Tag>
                break;
            case SUBMISSION_STATUS.GO_TO_LOCATION:
                return <Tag color='cyan'>GO_TO_LOCATION</Tag>
                break;
            case SUBMISSION_STATUS.WAIT_APPROVE_LOCATION:
                return <Tag color='cyan'>WAIT_APPROVE_LOCATION</Tag>
                break;
            case SUBMISSION_STATUS.SURVEY:
                return <Tag color='cyan'>SURVEY</Tag>
                break;
            case SUBMISSION_STATUS.WAITING_RESULT:
                return <Tag color='cyan'>WAITING_RESULT</Tag>
                break;
            case SUBMISSION_STATUS.WAITING_RATING:
                return <Tag color='cyan'>WAITING_RATING</Tag>
                break;
            case SUBMISSION_STATUS.FINISH:
                return <Tag color='cyan'>FINISH</Tag>
                break;
            case SUBMISSION_STATUS.REJECTED:
                return <Tag color='cyan'>REJECTED</Tag>
                break;
            default:
                return <Tag color='red'>UNKNOWN</Tag>
        }
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card title='Permohonan KJSB Selesai' isOption>
                        <List
                            loading={loading}
                            itemLayout="horizontal"
                            dataSource={datas}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 10
                            }}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Link to={{ pathname : "/kjsb/permohonan/detail", state : item }}><Button type='primary' shape='round'>More</Button></Link>]}
                                >
                                    <Skeleton avatar title={false} loading={loading} active>
                                        <List.Item.Meta
                                            avatar={<Avatar src={`${item.service.icon_url_thumb}`} />}
                                            title={<Link to={{ pathname : "/kjsb/permohonan/detail", state : item }}>{item.code}</Link>}
                                            description={`Alamat : ${item.applicant_address} | No. Telp : ${item.phone}`}
                                        />
                                        <div>{status(item.status)}</div>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Permohonan;