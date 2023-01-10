import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://emoji-api.com/emojis?access_key=f750d1b3a7622e65bcfc9f7a274aece8dc8cd1b6')
    .then(res=>res.json())
    .then(res=>setData(res))
  }, [])

  let handleSearch = (e)=>{
    setSearch(e.target.value)
  }
  let handleSubmit = ()=>{
    if (search !== ''){
      fetch(`https://emoji-api.com/emojis?search=${search}&access_key=f750d1b3a7622e65bcfc9f7a274aece8dc8cd1b6`)
      .then(res=>res.json())
      .then(res=>{
        if(res){
          setData(res)
        }else{
          setData([])
        }
      }) 
    }
  }
  return (
    <div className="App">
      <div className="menu">
        <div className="menu_text">
          <h1>Emoji Search</h1>
          <p>A simple Emoji search with React</p>
          <div>
          <input type="text" placeholder='Search' value={search} onChange={(e)=>handleSearch(e)}/>
          <button className='search' onClick={(e)=>handleSubmit()}>Search</button>
          </div>
        </div>      
      </div>
      <div className="container">
        {
          data.map((e,i)=>
          <div className="card" key={e.slug}>
          <p className='emo'>{e.character}</p>
          <p className='name'>{e.unicodeName}</p>
          </div>)
        }
        
      </div>
    </div>
  );
}

export default App;
