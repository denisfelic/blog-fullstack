
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

function App() {

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 >The Public Blog </h1>
          <Link to="/" >Posts</Link>
        </header>

      </div>
      <hr />
      <Switch >
        <Route path="/post/create" component={CreatePost} />
        <Route path="/post/:id" component={Post} />
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

function CreatePost(props) {

  const [title, setTitle] = useState('');
  const [content, setcontent] = useState('');
  const [authorName, setauthorName] = useState('');

  function handleTitleInput(value, setCallBack) {
    setCallBack(value.target.value)
    console.log(value.target.value)
  }

  async function handleSubmit() {
    if (!title || !content || !authorName) {
      alert('You need to add all inputs fields');
      return;
    }

    try {
      await axios.post('https://node-js-mysql.herokuapp.com/', {
        title: title,
        content: content,
        authorName: authorName
      })
      props.history.push('/')
    } catch (error) {
      console.log(error)
      alert('error')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }} >
      <input type="text" placeholder="title" onChange={
        (e) => handleTitleInput(e, setTitle)
      } />


      <textarea placeholder="Ćontent" cols="30" rows="10"
        onChange={(e) => handleTitleInput(e, setcontent)}
      ></textarea>
      <input type="text" placeholder="Author" onChange={(e) => { handleTitleInput(e, setauthorName) }} />
      <button onClick={handleSubmit} >Enviar</button>
    </div>
  )
}

const Posts = (props) => {
  const [postData, setPostData] = useState([]);



  useEffect(() => {
    axios.get('https://node-js-mysql.herokuapp.com/').then((data) => {
      setPostData(data.data.data.reverse())
    })
  }, [])


  return (
    <main>
      <Link style={{ border: '1px solid' }} to="/post/create" >Criar novo post</Link>
      <ul>
        {postData.map((p, i) => {
          return <li key={i} className="postItem">
            <Link to={{
              pathname: '/post/' + i,
              state: p
            }} >
              <h3>{p.title}</h3>
              <hr />
              <p>{p.content}</p>
              <hr />
              <p><strong>Author: </strong> {p.authorName}</p>
              <p><strong>Likes: </strong>{p.likes}</p>
            </Link>
          </li>
        })}
      </ul>
    </main>
  )
}


function Post(props) {
  let data = useLocation();
  let p = data.state
  return (
    <div style={{ marginTop: '50px' }}>
      <h3>{p.title}</h3>
      <hr />
      <p>{p.content}</p>
      <hr />
      <p><strong>Author: </strong> {p.authorName}</p>
      <p><strong>Likes: </strong>{p.likes}</p>
    </div>
  )
}
export default App;
