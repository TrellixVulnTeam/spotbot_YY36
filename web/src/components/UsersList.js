import React from 'react'
import { Table, Container, Button} from 'react-bootstrap'

const UsersList = props => {
    return (
        <Container>
            <div className='text-center' >
                <Button variant="primary" onClick={props.refreshUsers}>Refresh</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {props.Users.map((user, index) => (
                        <tr className='text-center' key={user.id}>
                            <td>{index+1}</td>
                            <td><img src={user.image} alt='' height='40px' width='40px' /></td>
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UsersList