import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon } from 'google-maps-react';
// antd
import { Button, Alert, Skeleton, Divider, Space, Timeline } from 'antd'
import { DownloadOutlined, ClockCircleOutlined } from '@ant-design/icons'
// fetch data
import _Axios from "../../../services/_Axios";
// component


const GoogleMap = (props) => {
    const [show, setShow] = useState(false)
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Map
                initialCenter={{
                    lat: props.patok[0].lat,
                    lng: props.patok[0].lon
                }}
                google={props.google}
                className="map"
                zoom={18}>
                {props.patok.map((item, key) => (
                    <Marker
                        key={key}
                        onClick={()=>setShow(true)}
                        name="Roman Point"
                        position={{ lat: item.lat, lng: item.lon }}
                        draggable={true}
                    >
                        <InfoWindow
                            marker={{ lat: item.lat, lng: item.lon }}
                            visible={show}>
                            <div>
                                <h1>Tes Dulu</h1>
                            </div>
                        </InfoWindow>
                    </Marker>
                ))}
            </Map>
        </div>
    )
}
const Peta = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(GoogleMap);

const TabBerkas = (props) => {
    const { skb_submissions_id } = props
    const [datas, setDatas] = useState([]);
    const [patok, setPatok] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadpat, setLoadpat] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [show, setShow] = useState(false)

    useEffect(() => {
        load();
        loadPatok();
        console.log(skb_submissions_id)
    }, [])

    const load = () => {
        setLoading(true);
        _Axios.get(`admin/skb/submission/download/${skb_submissions_id}`)
            .then(async res => {
                await setDatas(res.data.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const loadPatok = () => {
        setLoadpat(true);
        _Axios.get(`admin/skb/submission/border/${skb_submissions_id}`)
            .then(res => {
                setPatok(res.data.data)
                setLoadpat(false)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                setLoadpat(false)
            })
    }

    const download = (url) => {
        window.open(url)
    }


    return (
        <>
            <Divider orientation='left'>Berkas Pemohon</Divider>
            <Space>
                {loading ?
                    <Skeleton active={loading} />
                    :
                    <>
                        {datas.link !== undefined ?
                            <Button danger onClick={() => download(datas.link)} shape='round' icon={<DownloadOutlined />} size='large'> Berkas Pemohon</Button>
                            :
                            <Button danger shape='round' icon={<DownloadOutlined />} disabled size='large'> Berkas Pemohon</Button>
                        }

                    </>
                }
            </Space>
            <Divider orientation='left'>Batas/Patok</Divider>
            {patok.length === 0 ?
                <Alert
                    message="Error"
                    description="Belum Ada Data Patok!."
                    type="error"
                    showIcon
                    closable
                /> :
                <Peta patok={patok} />
            }

        </>
    );

}

export default TabBerkas;