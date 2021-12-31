import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from "../../../App/components/MainCard";
import { Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon } from 'google-maps-react';
// antd
import { Tag, Tabs, Divider } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
// fetch data
import _Axios from "../../../services/_Axios";
import { SUBMISSION_STATUS } from '../../../services/skb.const';
// component
import TabPembayaran from './pembayaran';
import TabHasil from './hasil-ukur';
import TabBerkas from './tab-berkas';

const { TabPane } = Tabs;

const GoogleMap = (props) => (
    <div style={{ height: '300px', width: '100%' }}>
        <Map
            initialCenter={{
                lat: props.skb.lat,
                lng: props.skb.lon
            }}
            google={props.google}
            className="map"
            zoom={16}>
            <Marker
                name="Roman Point"
                position={{ lat: props.skb.lat, lng: props.skb.lon }}
            />

            <Marker />
        </Map>
    </div>
)
const Peta = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(GoogleMap);

const TabDetil = (props) => {
    const { skb, google, map } = props
    const [position, setPosition] = useState(null);

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
                return <Tag color='red'>REJECTED</Tag>
                break;
            default:
                return <Tag color='red'>UNKNOWN</Tag>
        }
    }

    return (
        <Card title={`#${skb.code}`} isOption>
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <AppleOutlined />
                            Detail KJSB
                        </span>
                    }
                    key="1"
                >
                    <dl className="dl-horizontal row">
                        <dt className="col-sm-3">Nama Pemilik</dt>
                        <dd className="col-sm-9">: {skb.applicant}</dd>

                        <dt className="col-sm-3">NIK KTP</dt>
                        <dd className="col-sm-9">: {skb.nik}</dd>

                        <dt className="col-sm-3">Alamat Lokasi Tanah</dt>
                        <dd className="col-sm-9">: {skb.applicant_address}</dd>

                        <dt className="col-sm-3">No. Telp.</dt>
                        <dd className="col-sm-9">: {skb.phone}</dd>

                        <dt className="col-sm-3">Luas Tanah</dt>
                        <dd className="col-sm-9">: {skb.land_size} m2</dd>

                        <dt className="col-sm-3">Kode KJSB</dt>
                        <dd className="col-sm-9">: {skb.code}</dd>

                        <dt className="col-sm-3">Status KJSB</dt>
                        <dd className="col-sm-9">: {status(skb.status)}</dd>
                    </dl>
                    <Divider orientation='left'>Peta Tempat Tinggal</Divider>
                    <Peta skb={skb}/>
                </TabPane>
                <TabPane
                    tab ={
                        <span>
                        <AndroidOutlined />
                        Berkas & Patok
                    </span>
                    }
                    key="2"
                >
                    <TabBerkas skb_submissions_id={skb.id}/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Pembayaran
                        </span>
                    }
                    key="3"
                >
                    <TabPembayaran skb_submissions_id={skb.id} transactions_id={skb.transactions[0] ? skb.transactions[0].id : null} />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Extra & Hasil
                        </span>
                    }
                    key="4"
                >
                    <TabHasil skb_submissions_id={skb.id} />
                </TabPane>
            </Tabs>
        </Card>
    );

}

export default TabDetil;