import React from 'react'
import {Table} from 'react-bootstrap'


const WinnersList = props => {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>id</th>
                        <th>Server Name</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.Winners.map((user, index) => (
                        <tr className='text-center' key={user.id}>
                            <td>{index + 1}</td>
                            <td><img src={user.discord_image} alt='' height='40px' width='40px' /></td>
                            <td>{user.discord_name}</td>
                            <td>{user.discord_id}</td>
                            <td>{user.discord_server_name}</td>
                            <td>{user.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default WinnersList