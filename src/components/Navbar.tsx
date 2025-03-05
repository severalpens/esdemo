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
          <div className="p-4" hidden>
            <NavLink className="" to="/searchHybrid">
              Hybrid Search
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/allDocs">
              All Docs
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/baselineSearch">
              Baseline Search
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/baselineSearchExtra">
              Baseline Search Extra
            </NavLink>
          </div>
          <div className="p-4">
            <NavLink className="" to="/assessmentResults">
              Assessment Results
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;