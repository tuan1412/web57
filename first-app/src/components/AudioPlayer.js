import React from 'react';
import WaveSurfer from 'wavesurfer';

function AudioPlayer({ id, src }) {
  const wavesurfer = React.useRef();

  React.useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#audio_${id}`,
      waveColor: 'violet',
      progressColor: 'purple'
  });
  }, [id]);

  React.useEffect(() => {
    if (src && wavesurfer.current) {
      wavesurfer.current.load(src)
    }
  }, [src]);

  const playAudio = () => {
    if (wavesurfer.current) {
      wavesurfer.current.play()
    }
  }

  const stopAudio = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop()
    }
  }

  return (
    <div>
      <div id={`audio_${id}`}></div>
      <button onClick={playAudio}>play</button>
      <button onClick={stopAudio}>stop</button>

    </div>
  )
  
}

export default AudioPlayer;