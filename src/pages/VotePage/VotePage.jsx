import React, { useState } from "react";
import { Typography, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import "./votePage.css";

const VotePage = () => {
  const [radioSelection, setRadioSelection] = useState(null);

  const candidates = [
    { id: "gorkem", name: "Görkem Giray" },
    { id: "onur", name: "Onur Demirörs" },
    { id: "soylu", name: "Görkem Soylu" },
    { id: "example1", name: "Example 1" },
    { id: "example2", name: "Example 2" },
    { id: "example3", name: "Example 3" },
    { id: "example4", name: "Example 4" },
    { id: "example5", name: "Example 1" },
    { id: "example6", name: "Example 2" },
    { id: "example7", name: "Example 3" },
    { id: "example8", name: "Example 4" },
    
  ];

  const handleRadioChange = (event) => {
    setRadioSelection(event.target.value);
  };

  return (
    <div className="main">
      <div className="mainContent">
        <Typography variant="h2">Vote for Department Representatives</Typography>
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
              {candidates.map((candidate) => (
                <FormControlLabel
                  key={candidate.id}
                  value={candidate.id}
                  control={<Radio color="success"/>}
                  label={candidate.name}
                  labelPlacement="start"
                  

            
                />
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="mainSubmitPart">
          <div className="mainSubmitRadio">
            <Radio
              id="text"
              value="text"
              name="content"
              className="secondRadio"
              checked={radioSelection === "text"}
              onChange={handleRadioChange}
              color="success"
              
            />
            <label htmlFor="text">I don't want to vote for anyone</label>
          </div>
          <Button type="submit" variant="contained" color="error" size="large" component="a" href="/" >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
