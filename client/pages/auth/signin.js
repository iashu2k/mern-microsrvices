import { useState } from "react";
import Router from "next/router"
import useRequest from '../../hooks/use-request'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {doRequest, errors} = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="email"
        />
        
      </div>
      <div className="form-group">
        <label htmlFor="pass">Password</label>
        
        <input
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="pass"
          name="pass"
          type="password"
        />
        
      </div>
       {errors}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SignIn;
