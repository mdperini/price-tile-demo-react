import React from "react";
import Classes from "./Footer.css";

const Footer = props => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <button className={Classes.Button}>Search</button>
              <button className={Classes.Button} onClick={props.onResetClick}>
                Reset
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Footer;
