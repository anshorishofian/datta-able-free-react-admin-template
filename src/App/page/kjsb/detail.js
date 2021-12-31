import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux"
import Card from "../../../App/components/MainCard";
import { useSelector } from 'react-redux'
// antd
import { List, Avatar, Button, Skeleton, Tag } from 'antd'
// fetch data
import _Axios from "../../../services/_Axios";
// component
import Pemohon from './pemohon';
import TabDetil from './tab-detail';

const Detil = (props) => {
    const { state } = props.location;
    return (
        <Aux>
            <Row>
                <Col sm={12} lg={3} md={3}>
                    <Row>
                        <Col>
                            <Pemohon title={`Pemohon`} type={`pemohon`} skb={state} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Pemohon title={`Surveyor`} type={`surveyor`} skb={state} />
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} lg={9} md={9}>
                    <TabDetil title={'Detail'} skb={state}/>
                </Col>
            </Row>
        </Aux>
    );

}

export default Detil;