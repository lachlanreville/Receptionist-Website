import React, { useEffect } from 'react';
import TopNav from '../components/Navigation/TopNav'
import { Container, Column, Row, Break } from '../components/Containers'

export default () => {
    useEffect(() => {

    })

    return (
        <>
            <TopNav />

            <Break height="100" />

            <Container>
                <Row>
                    <Column size="3">
                        <h1>Receptionist</h1>
                        <p>Bringing Tickets And Applications To Your Discord Server With Ease</p>
                    </Column>
                    <Column size="3">
                        <img src="http://localhost:3000/img/Logo-3.png" width="256" height="256" alt="Logo" style={{ margin: "auto" }} />
                    </Column>
                </Row>
            </Container>
        </>
    )
}