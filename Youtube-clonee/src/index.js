import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      SV: 'reactjs',
      VideosList: [],
      load: null ,
      urlV: '',
      comment: '',
      CommentL: [],
      LikeVideo: 'Like',
      Err: false
    };
  }
setSearchValue = (event) => {

this.setState({
  SV: event.target.value
})
console.log(this.state.SV)
}
SVeo = async () => {
    this.setState({
    load: "LOADING",
    Err: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.SV}&type=video&videoDefinition=high&key=AIzaSyDBxtSB0PEVYgrk0KF7Tx9APKG7XbasNYs`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    Err: true
  })
}
this.setState({
  VideosList: myJson.items
})
console.log(this.state.VideosList)
  this.setState({
    load: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    load: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  VideosList: myJson.items,
  load: "LOADED"
})
console.log(this.state.VideosList)
this.setState({
  urlV: this.state.VideosList[0].id.videoId
})
console.log("urlV" , this.state.urlV)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("VideosList" , this.state.VideosList)
}
setCurrentUrl = (id) => {

  this.setState({
    urlV: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    CommentL: [...this.state.CommentL, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.LikeVideo == "Like"){
  this.setState({
    LikeVideo: 'Liked'
  })
  } else {
      this.setState({
    LikeVideo: 'Like'
  })
  }

}

  render() {
    let videos = this.state.VideosList.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '229px',cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"370px",marginTop:"-20",width:"490px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.SVeo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.Err ? (<h1>No videos found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.urlV}`} style={{height: '350px', width: '850px', float : 'left',marginLeft: "2%"}}/>
)}

      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '350px',marginTop:"-712x", float : 'right'}}>
        {this.state.load == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "832px" ,backgroundColor:" red",padding:'11px'}}onClick={this.likeButton}>{this.state.LikeVideo}</button>
{this.state.CommentL.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'302px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"44px", width:'300px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'583px', width:'124px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"22px" ,width:'121px'}}> Cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));