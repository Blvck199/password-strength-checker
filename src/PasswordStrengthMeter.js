import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import brandLogo from './assets/images/brand.webp'; // Adjust the path as per your directory structure

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const testResult = zxcvbn(password);
  const num = testResult.score * 100 / 4;

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
          onChange={e => setPassword(e.target.value)}
        />
        <div className="strength-meter">
          <div style={changeColor()}></div>
        </div>
        <p>{createPasswordLabel()}</p>

        <button onClick={showPopup}>More Info</button>
      </div>

      {/* Popup */}
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
