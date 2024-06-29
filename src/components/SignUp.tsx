export const SignUp = ({
                           name,
                           setName,
                           phone_number,
                           setPhone_number,
                           username,
                           setUsername,
                           password,
                           setPassword,
                           role,
                           setRole
                       }) => {
    return (
        <div>
            <h3>
                Sign Up
            </h3>
            <form >
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}
                           required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input type="tel" className="form-control" value={phone_number}
                           onChange={e => setPhone_number(e.target.value)} required/>
                </div>
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
                <div>
                    <input type="checkbox" id="vehicle1" name="doctor" value={role} onChange={() => setRole(r => !r)}/>
                    <label htmlFor="vehicle1">I am a doctor</label>
                </div>
            </form>
        </div>
    );
}