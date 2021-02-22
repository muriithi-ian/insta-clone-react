import React from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";


function Post({ username, caption, imageUrl }) {

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img
                src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
                alt=""
                className="post_image"
            />
            <h4 className="post_text"><strong>{username} </strong> {caption} </h4>
        </div>
    )
}

export default Post
