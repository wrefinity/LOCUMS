import React, { useState } from "react";
import axios from "axios";
import { authenticate } from "../../data/api";
import { BiEnvelope, BiPhoneCall, BiStore, BiUser } from "react-icons/bi";
import { BsFillLockFill } from "react-icons/bs";

function Register() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      let data = userData;
      data.email = data.email.toLowerCase().replace(/ /g, "");
      const response = await axios.post(authenticate.addUser, data);
      setMessage(response.data.msg + ".");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (err) {
      setMessage(err.response.data.msg + "!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }
  return (
    <>
      <form className="sign-up-form" onSubmit={register}>
        <h2 className="tite">Sign up - (Organization)</h2>
        <h4 style={{ color: "red", textAlign: "center" }}>{message}</h4>
        <div className="input-field">
          <i>
            <BiUser className="iconInput" />
          </i>
          <input
            type="text"
            required={true}
            placeholder="Fullname ... John Doe"
            onChange={(e) =>
              setUserData({ ...userData, fullname: e.target.value })
            }
          />
        </div>
        <div className="input-field">
          <i>
            <BiStore className="iconInput" />
          </i>
          <input
            type="text"
            required={true}
            placeholder="Username: generalhospital"
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div className="input-field">
          <i>
            <BiEnvelope className="iconInput" />
          </i>
          <input
            type="email"
            required={true}
            placeholder="Email ... johndoe@gmail"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>

        <div className="input-field">
          <i>
            <BiPhoneCall className="iconInput" />
          </i>
          <input
            type="text"
            required={true}
            placeholder="Phone 090********"
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </div>
        <div className="input-field">
          <i>
            <BsFillLockFill className="iconInput" />
          </i>
          <input
            type="password"
            required={true}
            placeholder="Password"
            autoComplete="true"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>

        <input type="submit" className="btn-auth" value="Sign up" />
      </form>
    </>
  );
}

export default Register;
