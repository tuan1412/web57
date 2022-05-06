import React from 'react';

export default function Box({ constNumber = 1 }) {
  const [color, setColor] = React.useState('red');
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(200);

  // const area = width * height;

  // const area = { value : width * height * constNumber };
  const area = React.useMemo(() => {
    return { s: width * height * constNumber }
  },[width, height, constNumber])

  const arrray = React.useMemo(() => {
    return [area];
  }, [area])

  React.useEffect(() => {
    console.log('hello', area);
  }, [area])

  React.useEffect(() => {
    console.log('hello1', arrray);
  }, [arrray])

  return (
    <div>
      <div style={{ 
        background: color, 
        width, 
        height, 
        display: 'inline-block'
      }}>
        {area.value}
      </div>
      <button onClick={() => setColor('blue')}>blue</button>
      <button onClick={() => setColor('red')}>red</button>
      <button onClick={() => setColor('yellow')}>yellow</button>
      <input type="number" value={width} onChange={e => setWidth(+e.target.value)} />
      <input type="number" value={height} onChange={e => setWidth(+e.target.height)} />

    </div>
  )  
}