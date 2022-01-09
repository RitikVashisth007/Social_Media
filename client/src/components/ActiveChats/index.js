import { Avatar, Typography } from 'antd'
import React from 'react'

const index = ({user}) => {
    return (
        <div className='flex py-2 px-4 mb-1 rounded-xl' style={{background:"#272a34"}} >
            <Avatar src={`https://ui-avatars.com/api/?name=${user?.full_name}`} size="large" />
            <div className='flex flex-col items-start ml-4' >
                <Typography.Text className="capitalize" >{user.full_name}</Typography.Text>
                <Typography.Text>{user.email}</Typography.Text>
            </div>
        </div>
    )
}

export default index
