import React from "react";

import "./kofi.css";

/* From here: https://codesandbox.io/s/happy-sun-49mzk
*/
export class KoFi extends React.Component {
  render() {
    const { color, id, label } = this.props;
    
    return (
      <div class="btn-container">
        <a
          title={label}
          class="kofi-button"
          style={{ backgroundColor: color }}
          href={"https://ko-fi.com/" + id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="kofitext">
            <img
              src="https://ko-fi.com/img/cup-border.png"
              class="kofiimg"
              alt="Ko-Fi button"
            />
            {label}
          </span>
        </a>
      </div>
    );
  }
}
