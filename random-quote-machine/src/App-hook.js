import React from 'react'
import './App.css';
import ColorPicker from './hook-components/ColorPicker/ColorPicker';
import QuoteBox from './hook-components/QuoteBox/QuoteBox';
import Tags from './hook-components/Tags/Tags';

export default function AppHook() {
  const [activeColor, setActiveColor] = React.useState('cornflowerblue');
  const [activeTags, setActiveTags] = React.useState([]);

  const handleChangeTag = (tagName) => {
    setActiveTags(oldActiveTags => {
      const isActive = oldActiveTags.includes(tagName);
      if (isActive) {
        const newActiveTags = oldActiveTags.filter(t => t !== tagName);
        return newActiveTags
      }

      return [...oldActiveTags, tagName]
    })
  }

  const onChangeBackgroundColor = (newColor) => {
    setActiveColor(newColor)
  }

  return (
    <div className="App" style={{ background: activeColor }}>
      <div className="App-header">
        Random Quote Machine
      </div>
      <div className="App-content">
        <QuoteBox 
          activeColor={activeColor}
          activeTags={activeTags}
        />
      </div>
      <div className="App-picker">
        <ColorPicker 
          onChangeBackgroundColor={onChangeBackgroundColor} 
          activeColor={activeColor}
        />
      </div>
      <div className="App-tag">
        <Tags 
          handleChangeTag={handleChangeTag}
          activeTags={activeTags}
        />
      </div>
    </div>
  );
}
