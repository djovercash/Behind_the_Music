import React from 'react'
import Sound from 'react-sound';
// import AudioPlayerControls from './audioPlayerControls'

// class AudioClip extends React.Component {
//   state = {
//     controlled: true,
//     currentSong: {
//       url: this.props.clip.url,
//       title: this.props.clip.title,
//     },
//     position: 0,
//     volume: 100,
//     playbackRate: 1,
//     loop: false,
//     playStatus: Sound.status.PLAYING
//   }
//
//   getStatusText() {
//     switch (this.state.playStatus) {
//       case Sound.status.PLAYING:
//         return 'playing';
//       case Sound.status.PAUSED:
//         return 'paused';
//       case Sound.status.STOPPED:
//         return 'stopped';
//       default:
//         return '(unknown)';
//     }
//   }
//
//   handleSongSelected = (song) => {
//     this.setState({ currentSong: song, position: 0 });
//   }
//
//   handleControlledComponentChange = (event) => {
//     this.setState({
//       controlled: event.target.checked,
//       position: 0
//     });
//   }
//
//   renderCurrentSong() {
//     return (
//       <p>
//         Current song {this.state.currentSong.title}. Song is {this.getStatusText()}
//       </p>
//     );
//   }
//
//   render() {
//     console.log(this.state.currentSong)
//     console.log(this.props.clip.url)
//     const { volume, playbackRate, loop } = this.state;
//
//     return (
//       <div>
//         <label><input type="checkbox" checked={this.state.controlled} onChange={this.handleControlledComponentChange}/> Controlled Component</label>
//         {this.state.currentSong && this.renderCurrentSong()}
//         <AudioPlayerControls
//           playStatus={this.state.playStatus}
//           loop={loop}
//           onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
//           onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
//           onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
//           onStop={() => this.setState({ playStatus: Sound.status.STOPPED, position: 0 })}
//           onSeek={position => this.setState({ position })}
//           onVolumeUp={() => this.setState({ volume: volume >= 100 ? volume : volume + 10 })}
//           onVolumeDown={() => this.setState({ volume: volume <= 0 ? volume : volume - 10 })}
//           onPlaybackRateUp={() => this.setState({ playbackRate: playbackRate >= 4 ? playbackRate : playbackRate + 0.5 })}
//           onPlaybackRateDown={() => this.setState({ playbackRate: playbackRate <= 0.5 ? playbackRate : playbackRate - 0.5 })}
//           onToggleLoop={e => this.setState({ loop: e.target.checked })}
//           duration={this.state.currentSong ? this.state.currentSong.duration : 0}
//           position={this.state.position}
//           playbackRate={playbackRate}
//         />
//         {this.state.currentSong && (
//           this.state.controlled ? (
//             <Sound
//               url={this.state.currentSong.url}
//               playStatus={this.state.playStatus}
//               position={this.state.position}
//               volume={volume}
//               playbackRate={playbackRate}
//               loop={loop}
//               onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
//               onLoad={() => console.log('Loaded')}
//               onPlaying={({ position }) => this.setState({ position })}
//               onPause={() => console.log('Paused')}
//               onResume={() => console.log('Resumed')}
//               onStop={() => console.log('Stopped')}
//               onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
//             />
//           ) : (
//             <Sound
//               url={this.state.currentSong.url}
//               playStatus={this.state.playStatus}
//               playFromPosition={this.state.position}
//               volume={volume}
//               playbackRate={playbackRate}
//               loop={loop}
//               onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
//               onLoad={() => console.log('Loaded')}
//               onPlaying={({ position }) => console.log('Position', position)}
//               onPause={() => console.log('Paused')}
//               onResume={() => console.log('Resumed')}
//               onStop={() => console.log('Stopped')}
//               onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
//             />
//           )
//         )}
//       </div>
//     );
//   }
//
// }
//
const AudioClip = (props) => {
  return (
    <div>
      <h3>{props.clip.title}</h3>
      <Sound
       url={props.clip.url}
       playStatus={Sound.status.PLAYING}
       playFromPosition={300}
       onLoading={this.handleSongLoading}
       onPlaying={this.handleSongPlaying}
       onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    </div>
  )
}

export default AudioClip
