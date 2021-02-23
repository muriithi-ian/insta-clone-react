import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';


function Post({ postId, user, username, caption, imageUrl }) {

    const [comments, setcomments] = useState([])
    const [comment, setcomment] = useState("")

    useEffect(() => {
        // effect
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setcomments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            // cleanup
            unsubscribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setcomment('');
    }

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
                src={imageUrl}
                alt=""
                className="post_image"
            />
            <h4 className="post_text"><strong>{username} </strong> {caption} </h4>


            <div className="post_comments">
                {comments.map((com) => (
                    <p>
                        <strong>{com.username}</strong>
                        {' ' + com.text}
                    </p>
                ))}
            </div>


            {user && (
                <form className="post_commentBox">
                    <input
                        className="post_input"
                        type="text"
                        placeholder="Enter comment..."
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                    />
                    <button type="submit" disabled={!comment} onClick={postComment} className="post_button" > post </button>
                </form>
            )}

        </div>
    )
}

export default Post
