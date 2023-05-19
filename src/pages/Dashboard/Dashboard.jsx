import './Dashboard.css';
import person from '../../assets/images/persoon.png'
import statisticss from '../../assets/images/statistic.png';
export default function Dashboard() {
    return (
        <div>
            <body id="wholePage">
                <div className="container" id="secondLayer">
                    <div className="row gx-3">
                        <div className="col-1" id="colIcon">
                            <br /><br /><br />
                            <img className="img-fluid" src={person}/>
                        </div>
                        <div className="col-2" id="colInfo">
                            <div className="box">
                                <div className="container">
                                    <br /><br /><br />
                                    <h3 className="labelNames">
                                        Applicant <br />
                                        Information
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 col-lg-9" id="colTable">
                            <div className="box">
                                <div className="container" id="table">
                                    <div className="table-wrapper" style={{ "height": "200px", "overflow-y": "scroll" }}>
                                        <table className="fl-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Surname</th>
                                                    <th>E-mail</th>
                                                    <th>Department</th>
                                                    <th>Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>CENG</th>
                                                    <th>3</th>
                                                </tr>
                                                <tr>
                                                    <th>Elif</th>
                                                    <th>Altindag</th>
                                                    <th>elf@hotmail.com</th>
                                                    <th>MBG</th>
                                                    <th>2</th>
                                                </tr>
                                                <tr>
                                                    <th>Alperen</th>
                                                    <th>Tanriverdi</th>
                                                    <th>alptanriverdi@hotmail.com</th>
                                                    <th>ME</th>
                                                    <th>1</th>
                                                </tr>
                                                <tr>
                                                    <th>Furkan</th>
                                                    <th>Elmas</th>
                                                    <th>furkielma@hotmail.com</th>
                                                    <th>EHM</th>
                                                    <th>4</th>
                                                </tr>
                                                <tr>
                                                    <th>Ece</th>
                                                    <th>Elmali</th>
                                                    <th>elmaliece@hotmail.com</th>
                                                    <th>Chem</th>
                                                    <th>3</th>
                                                </tr>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>Student</th>
                                                    <th>4</th>
                                                </tr>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>Student</th>
                                                    <th>4</th>
                                                </tr>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>Student</th>
                                                    <th>4</th>
                                                </tr>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>Student</th>
                                                    <th>4</th>
                                                </tr>
                                                <tr>
                                                    <th>Cagin</th>
                                                    <th>Tunc</th>
                                                    <th>cagin@hotmail.com</th>
                                                    <th>Student</th>
                                                    <th>4</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="container" id="thirdLayer">
                    <div className="row gx-3">
                        <div className="col-2" id="header">
                            <img className="img-fluid" src={statisticss} id="colIcon2" />

                            <h3 className="labelNames">Statistics<br />
                                For Departments
                            </h3>
                            <p className="backInfo">
                                The distribution of votes coming from
                                each departments, according to the number of
                                students in the departments.
                            </p>
                        </div>
                        <div className="col-auto" id="centerBar1">
                            <p style={{ "text-align": "center" }}>Science Faculty</p>
                            <div className="voteBox">
                                <p>Math</p>
                                <p>40%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "40%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>Chem</p>
                                <p>30%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "30%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>Physics</p>
                                <p>40%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "40%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>MBG</p>
                                <p>76%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "76%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>Photonic</p>
                                <p>47%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "47%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto" id="centerBar">
                            <p style={{ "text-align": "center" }}>Engineering Faculty</p>
                            <div className="voteBox">
                                <p>CENG</p>
                                <p>55%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "55%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>ME</p>
                                <p>67%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "67%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>MSE</p>
                                <p>69%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "69%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>FE</p>
                                <p>90%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "90%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>BioEng</p>
                                <p>86%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "86%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>EHM</p>
                                <p>34%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "34%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>ESE</p>
                                <p>14%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "14%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>EE</p>
                                <p>61%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "61%" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto" id="centerBar">
                            <p style={{ "text-align": "center" }}>Architecture Faculty</p>
                            <div className="voteBox">
                                <p>Archit</p>
                                <p>58%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "58%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>Industrial Design</p>
                                <p>47%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "47%" }}></div>
                                </div>
                            </div>
                            <div className="voteBox">
                                <p>CRP</p>
                                <p>89%</p>
                                <div className="vote">
                                    <div className="vote_level" style={{ "width": "89%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

            </body>
        </div>
    )
}