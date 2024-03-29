import React, { useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import Forms from './Forms'

const BotTable = props => {
    const [ShowToken, setShowToken] = useState(false)

    const showTokenButton = () => {
        if (ShowToken === false) {
            setShowToken(true)
        }
        else {
            setShowToken(false)
        }
    }

    return (
        <div>
            <Container>
                {props.BotInfo.length === 0
                    ? <Container>
                        <Forms handleChange={props.handleChange} handleSubmit={props.handleSubmit} />
                    </Container>
                    : <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Bot Name</th>
                                <th>TOKEN</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.BotInfo.map(b => (
                                    <tr key={b.bot_token}>
                                        <td>{b.bot_name}</td>
                                        <td>{ShowToken === true ? b.bot_token : '***************************************************************************'}</td>
                                        <td><Button onClick={() => showTokenButton()} variant="info">Show Token</Button></td>
                                        <td><Button onClick={() => props.deleteBot()} variant="danger">Delete</Button></td>
                                        <td><Button onClick={() => props.startBot()} variant="success">Start Bot</Button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                }
            </Container>
        </div>
    )
}

export default BotTable