import React, { Component } from "react";
import "./StatusPage.css";
import axios from 'axios'; 

class StatusPage extends Component {
    state = {
        candidates: []
    };
    componentDidMount() {
        this.getCandidates();
    }

    getCandidates() {
        axios
        .get('http://127.0.0.1:8000/candidateController/candidates/')
        .then(res => {
            this.setState({ candidates: res.data });
        })
            .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
        <div>
            <body id="wholePage">
                <div class="table-responsive">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Faculty</th>
                        <th scope="col">Department</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Is Approved</th>
                        <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.candidates.map(item => (
                            <tr>
                                <td>{item.student_id}</td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.faculty}</td>
                                <td>{item.department}</td>
                                <td>{item.email}</td>
                                <td>{item.is_approved}</td>
                                <td>{item.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </body>
        </div>
        );
    }
}
export default StatusPage;