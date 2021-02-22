import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';


function App() {
  const [posts, setPosts] = useState([
    {
      username: "username",
      caption: "caption 1!",
      imageUrl: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
    },
    {
      username: "username",
      caption: "caption 2!",
      imageUrl: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
    },
    {
      username: "username",
      caption: "caption 3!",
      imageUrl: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
    }
  ]);

  return (
    <div className="app">

      <div class="app_header">
        <img
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
          className="app_headerImage"
        />
      </div>
      <div className="app_post">
        {
          posts.map(post => (
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>

    </div>
  );
}

export default App;
