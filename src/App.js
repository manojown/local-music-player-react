import React, { Component } from 'react';



//import s2 from './videoplayback_14.m4a';

//import s2 from 'videoplayback_15.m4a';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {audio : [],duration:'',loc:0,audioobj:'',playing:false,currentTime:0,duration:0,sleep:0};
    }


    //  to pause current play music
    pause(){
      this.setState({
        playing:!this.state.playing,
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
        snd1.currentTime = thiscomp.state.currentTime;
        thiscomp.setState({
          audioobj:snd1,
          playing:!thiscomp.state.playing,
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

    // select file and set audio object to play pause operation and use base64 conversion
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
      reader.readAsDataURL(file)
    }

    // when get any text boc value to set  seconds to pause or play song
    updateInputValue(ee){
      this.setState({
        sleep : ee.target.value*1000
      });
        console.log('ee',ee.target.value);
    }


    // set a pause or play on perticular time by  setTimeout function
    calltimeout(){
      var thisComp = this;
      setTimeout(function(){
        if(thisComp.state.playing){
          thisComp.pause();
        }else{
          thisComp.playmusic();
        }
      },thisComp.state.sleep)
      alert('your seconds sets to pause')
    }
  render() {

// set audio object current time tract by set interval
if(this.state.audioobj!=''){
  var thisComp = this;
    setInterval(function () {
      thisComp.setState({
        currentTime:thisComp.state.audioobj.currentTime,
        duration:thisComp.state.audioobj.duration
     }); // will get you a lot more updates.

    // console.log('new state on interval',thisComp.state);
  }, 1000);
}


  // set a button and ui when song available
  var playButton;
  if(!this.state.playing && this.state.audio.length>0){
    playButton = (<p><button  onClick={(e)=>this.playmusic(e)}>play</button> Click button to play song
    <h3>enter time in second to play audio automatically when second finish</h3>
    <input type='input' onChange={evt => this.updateInputValue(evt)} />
    <button onClick = {evt => this.calltimeout(evt)} >Set</button></p>

    );

  }else if(this.state.playing && this.state.audio.length>0){
    playButton = (<p><button  onClick={(e)=>this.pause(e)}>pause</button>);
    <h3>enter time in second to pause audio automatically when second finish</h3>
    <input type='input' onChange={evt => this.updateInputValue(evt)} />
    <button onClick = {evt => this.calltimeout(evt)} >Set</button></p> );
  }




    return (
      <div className="previewComponent">
        <input className="fileInput" type="file" onChange={(e)=>this.selectAudiFile(e)} multiple/>
           {playButton}
        <h2>Remaining {Math.round((this.state.duration - this.state.currentTime))} seconds </h2>
      </div>


    );
  }
}

export default App;
