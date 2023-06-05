import React, { useEffect, useState } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import "./votePage.css";
import voteService from "../../services/voteService";
import NoData from "../../components/NoData";

const VotePage = () => {
  const [radioSelection, setRadioSelection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const init = React.useCallback(async () => {
    try {
      const res = await voteService.fetchUser();
      if (Array.isArray(res.data)) {
        setCandidates(res.data);
      } else {
        console.error("Invalid data format received:", res.data);
        setCandidates([]);
      }
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      setCandidates([]);
    } finally {
      setLoading(false); // Set loading to false when the data is fetched
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioSelection(event.target.value);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    console.log(radioSelection);

    const res = await voteService.vote(radioSelection);
    if (res.status === 200) {
      window.location = "/dashboard";
    }
    console.log(res);
  };

  return (
    <div className="main">
      {loading ? (
        null // Render nothing while loading is true
      ) : candidates.length === 0 ? (
        <NoData /> // Render NoData component when candidates array is empty
      ) : (
        <>
          <div className="mainContent">
            <Typography variant="h2">
              Vote for Department Representatives
            </Typography>
          </div>
          <div className="mainContainer">
            <div className="mainRadioBox">
              <Typography variant="subtitle1">Candidate Names</Typography>
              <RadioGroup
                name="username"
                value={radioSelection}
                onChange={handleRadioChange}
                className="candidateList"
              >
                <div className="scrollableList">
                  {candidates.map((candidate, index) => (
                    <FormControlLabel
                      key={index}
                      value={candidate.student_id}
                      control={<Radio color="success" />}
                      label={candidate.name + " " + candidate.surname}
                    />
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="mainSubmitPart">
              <div className="mainSubmitRadio">
                <Radio
                  id="text"
                  value="-1"
                  name="content"
                  className="secondRadio"
                  checked={radioSelection === "-1"}
                  onChange={handleRadioChange}
                  color="success"
                />
                <label htmlFor="text">I don't want to vote for anyone</label>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="large"
                component="a"
                href="/"
                onClick={handleButtonClick}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VotePage;
