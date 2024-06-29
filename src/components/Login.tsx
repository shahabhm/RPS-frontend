import './Login.css';

export const Login = ({
                          setUsername, setPassword, username, password
                      }) => {


    return (
        <div>
            <h3>
                Login
            </h3>
            <form >
                <div className="mb-3">
                    <label className="form-label">username:</label>
                    <input type="text" className="form-control" value={username}
                           onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password}
                           onChange={e => setPassword(e.target.value)} required/>
                </div>
            </form>
        </div>
    );
};