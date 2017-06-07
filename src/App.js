import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {blue500, red500, greenA200 , orange500} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import playIcon from './play-button.png';
import pauseIcon from './pause.png';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

//import s2 from './videoplayback_14.m4a';

//import s2 from 'videoplayback_15.m4a';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {audio : [],loc:0,audioobj:'',playing:false,currentTime:0,duration:0,sleep:0};
    }


    //  to pause current play music
    pause(){
      this.setState({
        playing:false,
        currentTime:this.state.audioobj.currentTime
        });
      this.state.audioobj.pause();
    }

    // to play music
    playmusic(){
      //write condition that id only song available to play
      if(this.state.audio.length){
        var   thiscomp = this;
        var snd1  = new Audio(this.state.audio[this.state.loc].src);
        console.log('thiscomp.state.currentTime',thiscomp.state.currentTime)
        snd1.currentTime = thiscomp.state.currentTime;
       thiscomp.setState({
          audioobj:snd1,
          playing:true,
          duration:snd1.duration
          });
        snd1.play()
        // select  second track if first track is ended
        snd1.onended = function(){
          thiscomp.setState({
            loc:thiscomp.state.loc+1
          });
          thiscomp.playmusic();
          }
        }
      }

    // when file submit
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }

    // select file and set audio object to play pause operation
    selectAudiFile(e) {

      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];


      reader.onloadend = () => {
        var songobj = {};
        songobj.name = file.name;
        songobj.src = reader.result;

        console.log(file);
        var audiofile = this.state.audio;
        audiofile.push(songobj);
        this.setState({
          audio:audiofile
        });
        console.log(this.state);
      }
      // read audio file for conversion
    reader.readAsDataURL(file) ;
      var FileArray = [];
      for (var i = 0; i < e.target.files.length; i++) {
        FileArray[i] = e.target.files[i];
      }
      // console.log('value',FileArray)
      async function main(){
        await  FileArray.map((value)=>{

          })
    }
    main();





    }

    // when get any text boc value to set  seconds to pause or play song
    updateInputValue(ee){
      this.setState({
        sleep : ee.target.value*1000
      });
        console.log('ee',ee.target.value);
    }

    nextmusic(){
      this.setState({
        loc : ++this.state.loc,
        currentTime : 0,
        duration:0,

      });
      console.log('calles pnextrec',this.state.currentTime);
      if(this.state.playing){
          this.pause();
      }

      this.playmusic();
    }
    prevmusic(){
      this.setState({
        loc : --this.state.loc,
        currentTime : 0,
        duration : 0,

      });
      if(this.state.playing){
          this.pause();
      }
      this.playmusic();
    }
    // set a pause or play on perticular time by  setTimeout function
    calltimeout(){
      var thisComp = this;
      if(thisComp.state.sleep>0){
        setTimeout(function(){
          if(thisComp.state.playing){
            thisComp.pause();

          }else{
            thisComp.playmusic();

          }
        },thisComp.state.sleep)
      }else {
        alert('first insert seconds in input box')
      }

      if(thisComp.state.playing){
        alert('your seconds sets to pause');
      }else {
        alert('your seconds sets to play');

      }
    }
  render() {

// set audio object current time tract by set interval
if(this.state.audioobj!=''){
  var thisComp = this;
  //   setInterval(function () {
  //     thisComp.setState({
  //       currentTime:thisComp.state.audioobj.currentTime,
  //       duration:thisComp.state.audioobj.duration
  //    }); // will get you a lot more updates.
  //
  //   // console.log('new state on interval',thisComp.state);
  // }, 1000);
}


  // set a button and ui when song available
  var playButton;
  var next;
  var prev;
  var musicName;
  var setOnOff;
  if(this.state.audio.length>0 && this.state.loc<this.state.audio.length-1){
    next = (<FloatingActionButton style={{margin:12}} onClick={(e)=>this.nextmusic(e)}>
      <img src={playIcon}/>
    </FloatingActionButton>);
    }
  if(this.state.audio.length>0 && this.state.loc>0){
    prev = (<FloatingActionButton style={{margin:12}} onClick={(e)=>this.prevmusic(e)}>
      <img src={playIcon}/>
    </FloatingActionButton>);
  }
  if(this.state.audio.length>0){
    musicName = ( <Subheader> {this.state.audio[this.state.loc].name }</Subheader>);
    setOnOff  = (<div><TextField hintText="enter seconds to set Trigger"  onChange={evt => this.updateInputValue(evt)} /> <br/>
    <RaisedButton label='Click to set start or stop music' onClick = {evt => this.calltimeout(evt)} primary={true}/>
    </div>
  );
  }
  if(!this.state.playing && this.state.audio.length>0){
    playButton = (
      <FloatingActionButton style={{margin:12 , padding:5}} onClick={(e)=>this.playmusic(e)} >
        <img src={playIcon}/>
      </FloatingActionButton>
    );
  } else if(this.state.playing && this.state.audio.length>0){
    playButton = (
      <FloatingActionButton  style={{margin:12, padding:5}} onClick={(e)=>this.pause(e)} >
        <img src={pauseIcon}/>
      </FloatingActionButton>
     );

  }


  var chooseFile = (<RaisedButton   containerElement='label'  label='Click to Choose your audio File' primary={true} >
  <input className="fileInput" type="file" onChange={(e)=>this.selectAudiFile(e)} multiple style={{ display: 'none' }}/>
  </RaisedButton>);

    return (
      <MuiThemeProvider>

        <div className="previewComponent" style={{flexDirection:'column' ,justifyContent: 'center' ,marginTop:200 , marginLeft:500}}>
          <div style={{flexDirection:'row' ,justifyContent: 'center'}}>
          {chooseFile}
          </div>

        <Card style={{ width:283}} >
          <div style={{padding:10 , justifyContent: 'center' }} >
            {prev}
            {playButton}
            {next}

          {/*  <h2> {Math.round((this.state.duration - this.state.currentTime)/60)}: {Math.round((this.state.duration - this.state.currentTime))%60}</h2>*/}
          {musicName}
          </div>
          <div style={{padding:5}}>
            {setOnOff}
          </div>
        </Card>


        </div>
      </MuiThemeProvider>

    );


  }
}

export default App;
