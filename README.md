# Password Strength Meter for React


This component visually displays the strength of a user's password with real-time feedback. It leverages the powerful [zxcvbn](https://github.com/dropbox/zxcvbn) library, developed by Dropbox, to estimate the password's strength and provides users with meaningful suggestions and warnings.


## Demo


[See Live Demo Here](https://blvck199.github.io/password-strength-checker/)


## Overview


The Password Strength Meter is a React component that allows users to gauge the strength of their passwords. It provides visual cues that range from "Very Weak" to "Strong" based on the complexity of the entered password. Additionally, it offers best practice tips to help users create stronger passwords.


## Features


- **Real-Time Feedback:** Displays password strength dynamically as the user types.
- **Visual Feedback:** Color-coded strength meter that transitions smoothly as the password strength changes.
- **Password Tips Popup:** A modal that provides actionable tips for creating stronger passwords.
- **Customizable:** Easily customizable colors and labels to match your brand or app theme.


## Installation


To get started with the Password Strength Meter, follow these steps:


### Step 1: Install zxcvbn


Since this component relies on the [zxcvbn](https://github.com/dropbox/zxcvbn) library for password strength estimation, install it first:


```bash
npm install zxcvbn --save
```


### Step 2: Add the Password Strength Meter Component


Copy and paste the following code into a new file called PasswordStrengthMeter.js in your React project:


```javascript
import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import brandLogo from './assets/images/brand.webp'; // Adjust the path as per your directory structure


const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);


  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;


  const createPasswordLabel = () => {
    switch (testResult.score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };


  const changeColor = () => ({
    width: `${num}%`,
    background: num > 66 ? 'green' : num > 33 ? 'yellow' : 'red'
  });


  const showPopup = () => {
    setPopupVisible(true);
  };


  const closePopup = () => {
    setPopupVisible(false);
  };


  return (
    <div className="App">
      <header>
        <img src={brandLogo} alt="Logo" className="logo" />
        <h1>Designed by Macpius</h1>
      </header>


      <div className="content">
        <h2>Check Your Password Strength</h2>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="strength-meter">
          <div style={changeColor()}></div>
        </div>
        <p>{createPasswordLabel()}</p>


        <button onClick={showPopup}>More Info</button>
      </div>


      {popupVisible && (
        <div id="popup" className="popup show">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <h3>Password Strength Tips</h3>
            <ul>
              <li>Use at least 8 characters.</li>
              <li>Include both uppercase and lowercase letters.</li>
              <li>Add numbers and special characters.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};


export default PasswordStrengthMeter;
```


### Step 3: Customize the Styles


Copy and paste the following CSS into your index.css or another appropriate CSS file in your project:


```css
body {
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  color: #333333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.App {
  text-align: center;
  padding: 40px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}


header {
  margin-bottom: 20px;
}


.logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}


header h1 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #444444;
}


.content h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #555555;
}


input {
  padding: 14px 16px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}


input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}


.strength-meter {
  height: 10px;
  width: 100%;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
}


.strength-meter > div {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 5px;
}


p {
  font-size: 14px;
  font-weight: 600;
  color: #555555;
  margin-top: 10px;
}


button {
  padding: 10px 20px;
  font-size: 14px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


button:hover {
  background-color: #0056b3;
}


.popup {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.popup.show {
  display: flex;
  animation: fadeIn 0.5s ease;
}


.popup-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: relative;
}


.popup-content h3 {
  margin-top: 0;
  color: #444444;
}


.popup-content ul {
  list-style-type: disc;
  padding-left: 20px;
}


.popup-content li {
  margin-bottom: 10px;
}


.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #444444;
  transition: color 0.3s ease;
}


.close-btn:hover {
  color: #ff0000;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


input::placeholder {
  color: #aaa;
}


input:focus::placeholder {
  color: #007bff;
}
```


### Step 4: Use the Component in Your App


In your App.js (or similar file), import and use the PasswordStrengthMeter component like so:


```javascript
import React from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter'; // Adjust the path based on your file structure


function App() {
  return (
    <div className="App">
      <PasswordStrengthMeter />
    </div>
  );
}


export default App;
```


### Customization Options
You can further customize the Password Strength Meter component in the following ways:


1. Adjusting Styles
Feel free to let your inner designer shine by tweaking the CSS to match your brand or app's vibe. Want a sleek, dark-mode look? Or maybe you prefer a splash of color that screams personality? The styles are your canvas, and the index.css file is where the magic happens. Go ahead, make it yours!


2. Modifying the createPasswordLabel Function
The createPasswordLabel function is the voice of your password meter—literally. Whether you want it to whisper gentle encouragements like "Not bad, but keep going!" or deliver tough love with "Come on, you can do better!"—this function is where you make that call. Customize these labels in the PasswordStrengthMeter.js file to reflect the tone and style of your app. Remember, a little personality goes a long way!


3. Enhancing the Popup with Additional Tips or Warnings
The current popup is great, but why stop at "great" when you can make it "legendary"? Add more tips, sprinkle in some security wisdom, or even throw in a fun fact about why password security matters. The ul element in the popup's JSX is your playground—make it count!


### Wrapping It All Up
So there you have it! With just a few tweaks, you can transform this Password Strength Meter into a custom-fit tool that not only keeps your users’ accounts safe but also leaves them with a smile (or a smirk) on their face. Whether you want to be professional, playful, or just plain practical, this component has got you covered.


Remember, strong passwords are like strong coffee—necessary for survival. So go ahead, unleash your creativity, and make password security a little less boring and a lot more fun. And if you ever feel like showing off your customizations, don’t hesitate to share them. After all, we’re all in this fight against weak passwords together!


Now go on, make those passwords uncrackable, and keep the cybervillains at bay!





