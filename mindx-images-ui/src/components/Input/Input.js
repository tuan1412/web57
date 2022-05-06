import React from 'react';

function TextInputWithFocusButton() {
  const inputEl = React.useRef(null);
  console.log('he', inputEl.current);

  const onButtonClick = () => {
    console.log(inputEl.current)
    // `current` points to the mounted text input element
    inputEl.current.style.color = "red";
  };
  return (
    <>
      <input ref={inputEl} type="text" id="focus" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
export default TextInputWithFocusButton;