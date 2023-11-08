import logo from './logo.svg';
import './App.css';
import Box from "./Box"
import {useState} from 'react'
function Header(props){
  console.log('props', props);
  return <header>
      <h1><a href="/" onClick={event=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
}
function Nav(props){
  const list = []
  for (let i =0 ; i < props.topics.length; i++){
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
            <ol>
              {list}
            </ol>
          </nav>
}
function Article(props){
  return <article>
            <h2>
              {props.title}, {props.body}
            </h2>
          </article>

}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name = "title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value = "Create"/></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name = "title" placeholder="title" value = {title} onChange={event=>{
        console.log(event.target.value);
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value = {body} onChange={event=>{
        console.log(event.target.value);
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value = "Update"/></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    {id:1, title: 'html', body:'html is ...'},
    {id:2, title: 'css', body:'css is ...'},
    {id:3, title: 'javascript', body:'javascript is ...'},
  ]);
  const [nextId, setNextId] = useState(topics.length+1);

  let content = null;
  let contextControl = null;
  if(mode === 'Welcome'){
    content =  <Article title="Welcome" body = "welcome React"/>
  }else if (mode ==='Read'){
    let title, body = null;
    for(let i =0 ; i < topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content =  <Article title={title} body = {body}/>
    contextControl= <li><a href={'/update'+id} onClick={event=>{
      event.preventDefault();
      setMode('Update');
    }}>Update</a></li>
  }else if( mode === 'Create'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('Read');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if( mode === 'Update'){
    let title, body = null;
    for(let i =0 ; i < topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body = {body}  onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics];
      const updatedTopic = {id:id , title : title, body: body};
      for(let i =0 ; i < newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('Read');
    }}></Update>
  }
  return (
    <div className="box">
      {
        <main>
        <div>
          <Header title = "REACT" onChangeMode={()=>{
            setMode('Welcome');
          }}/>
          <Nav topics = {topics} onChangeMode={_id=>{
            setMode('Read');
            setId(_id);
          }}/>
          {content}
          <ul>
            <li>
              <a href="/create" onClick={event=>{
                event.preventDefault();
                setMode('Create');
              }}>Create</a>
              {contextControl}
            </li>
            
          </ul>
        </div>
        </main>

      }
    </div>
  );
}

export default App;
