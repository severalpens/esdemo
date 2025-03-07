import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="border-b border-black bg-gray-200">
        <div className="p-4 columns-2 flex">
          <div className="p-4">
            <NavLink className="font-bold" to="/">
              Home
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/baselineSearchExtra">
              Assess TestSet Queries
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/runTests">
              Run Tests
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;