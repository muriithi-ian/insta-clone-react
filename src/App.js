import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import ImageUpload from './ImageUpload';
import Post from './Post';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        // user logged in
        console.log(authUser)
        setUser(authUser);
      } else {
        // user logged out
        setUser(null);
      }
    })
    return () => {
      // cleanup
      unsubscribe();
    }
  }, [user, username])


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => alert(err.message))

    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  const signOut = (e) => {
    auth.signOut();
    setUser(null);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
                className="app_headerImage"
              />
            </center>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />

            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <Input
              placeholder="passsword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button type="submit" onClick={signUp}>sign up</Button>
          </form>

        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
                className="app_headerImage"
              />
            </center>

            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <Input
              placeholder="passsword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button type="submit" onClick={signIn}>sign in</Button>
          </form>

        </div>
      </Modal>

      <div className="app_header">
        <img
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram"
          className="app_headerImage"
        />

        {user ? (
          <Button onClick={signOut}>Logout</Button>
        ) : (
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn(true)} >Login</Button>
              <Button onClick={() => setOpen(true)} >Sign up</Button>
            </div>
          )}
      </div>

      <div className="app_addPost">
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
            <h3>Sorry, you need to login to upload post</h3>
          )}
      </div>

      <div className="app_post">
        {
          posts.map(({ id, post }) => (
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
