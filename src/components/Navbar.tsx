import { NavLink } from 'react-router-dom';

function Navbar() {

  return (
    <>
      <div className="container flex justify-between mx-auto  border border-black px-4 rounded-3xl">
        <div className="p-6 columns-2  flex ">
          <div className="p-6 ">
            <NavLink className="font-bold" to="/">
              Home
            </NavLink>
          </div>
          <div className="p-6" hidden>
            <NavLink className="" to="/testAPIConnection">
              Test API Connection
            </NavLink>
          </div>
          <div className="p-6">
            <NavLink className="" to="/searchClientDemo">
              Client-Side Search
            </NavLink>
          </div>
          <div className="p-6">
            <NavLink className="" to="/searchHybrid">
              Hybrid Search
            </NavLink>
          </div>
          <div className="p-6" >
            <NavLink className="" to="/searchFullText">
              Full Text Search
            </NavLink>
          </div>
          <div className="p-6" >
            <NavLink className="" to="/testFuncConnection">
              Test Func Connection
            </NavLink>
          </div>
        </div>
      </div>
    </>
       );
}

export default Navbar;