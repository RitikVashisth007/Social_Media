import { Avatar, Divider, Typography } from 'antd'
import React from 'react'

const UserDetails = () => {
    return (
        <div className="flex-col flex items-center " >
            <div className="flex flex-col items-center" > 
                <Avatar src="https://i.pravatar.cc/300" style={{height:100, width:100}} />
                <Typography.Text className="text-lg font-semibold">Susan Smith</Typography.Text>
                <Typography.Text className="text-sm" >@Susan_Smith</Typography.Text>
            </div>
            <div className='flex justify-between w-11/12 mt-3' >
                <div className='flex flex-col' >
                    <Typography.Text className="text-lg font-semibold" >46</Typography.Text>
                    <Typography.Text>Post</Typography.Text>
                </div>
                <Divider type="vertical" style={{height:50, borderColor:"white"}} />
                <div className='flex flex-col' >
                    <Typography.Text className="text-lg font-semibold" >2.5k</Typography.Text>
                    <Typography.Text>Followers</Typography.Text>
                </div>
                <Divider type="vertical" style={{height:50, borderColor:"white"}} />
                
                <div className='flex flex-col' >
                    <Typography.Text className="text-lg font-semibold" >302</Typography.Text>
                    <Typography.Text>Following</Typography.Text>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
