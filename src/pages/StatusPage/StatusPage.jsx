import React, { Component } from "react";
import currentCandidates from "../../services/status.service";
import "./StatusPage.css";
import FeedIcon from '@mui/icons-material/Feed';

class StatusPage extends Component {
  state = {
    candidates: [],
    currentPage: 1,
    candidatesPerPage: 4,
    selectedDepartment: ""
  };

  componentDidMount() {
    this.getCandidates();
  }

  async getCandidates() {
    const res = await currentCandidates.fetchCandidates();
    console.log(res);
    if (res?.status === 200) {
      this.setState({ candidates: res.data });
    } else {
      console.log(res?.data?.error);
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleDepartmentChange = (event) => {
    this.setState({ selectedDepartment: event.target.value, currentPage: 1 });
  };

  render() {
    const { candidates, currentPage, candidatesPerPage, selectedDepartment } = this.state;

    // Filter candidates based on selected department
    const filteredCandidates = selectedDepartment
      ? candidates.filter((candidate) => candidate.department === selectedDepartment)
      : candidates;

    // Logic for displaying candidates
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = filteredCandidates.slice(
      indexOfFirstCandidate,
      indexOfLastCandidate
    );

    // Logic for determining button availability
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === Math.ceil(filteredCandidates.length / candidatesPerPage);

    return (
      <div>
        <body>
          <div className="container">
            <div className="row" id="layer">
              <div className="col-1" id="column1">
                <FeedIcon sx={{ color: "#bb2222", fontSize: "60px"}}></FeedIcon>
              </div>
              <div className="col-4" id="column2">
                <h2>Election Status</h2>
              </div>
            </div>
            <div className="row" id="layer">
              <div className="col-12">
                <label htmlFor="departmentSelect" id="departmentSelect2">Select Department:</label>
                <select
                  id="departmentSelect"
                  className="form-select"
                  value={selectedDepartment}
                  onChange={this.handleDepartmentChange}
                >
                  <option value="">All Departments</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Bio-Engineering">Bio-Engineering</option>
                  <option value="Food Engineering">Food Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Metarial Engineering">Material Engineering</option>
                  <option value="Energy Engineering">Energy Engineering</option>
                  <option value="Chemical Engineering">Electrical Engineering</option>
                  <option value="Industrial Design">Industrial Design</option>
                </select>
              </div>
            </div>
            <div className="row" id="layer">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3 px-4 me-4">ID</th>
                      <th scope="col" className="py-3 px-4 me-4">Name</th>
                      <th scope="col" className="py-3 px-4 me-4">Surname</th>
                      <th scope="col" className="py-3 px-4 me-4">Department</th>
                      <th scope="col" className="py-3 px-4 me-4">E-mail</th>
                      <th scope="col" className="py-3 px-4 me-4">Is Approved</th>
                      <th scope="col" className="py-3 px-4 me-4">Grade</th>
                    </tr>
                  </thead>
                    <tbody>
                        {currentCandidates.map((item) => (
                            <tr key={item.student_id}>
                            <td>{item.student_id}</td>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.department}</td>
                            <td>{item.email}</td>
                            <td>{item.is_approved ? "yes" : "no"}</td>
                            <td>{item.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
              >
                Previous
              </button>
            </li>
            <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={isLastPage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </body>
    </div>
  );
}
}

export default StatusPage;

