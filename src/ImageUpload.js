import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core';
import { db, storage } from './firebase';
import firebase from 'firebase';
import './imageupload.css'

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handlePost = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    snapshot.bytesTransferred / snapshot.totalBytes * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error function
                alert(error.message)
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post to db
                        db.collection("posts").add({
                            imageUrl: url,
                            caption: caption,
                            username: username,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        setProgress(0);
                        setImage(null);
                        setCaption('');
                    })
            }
        )
    }


    return (
        < div className="imageupload">
            <progress value={progress} max="100" className="imageupload_progress" />
            <Input type="text" placeholder="Enter a caption..." onChange={e => setCaption(e.target.value)} value={caption} />
            <Input type="file" onChange={handleChange}/>
            <Button onClick={handlePost} >
                post
            </Button>
        </div >
    )
}

export default ImageUpload
