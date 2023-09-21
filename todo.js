const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');

const app = express();



// Define a route to handle GET requests at the "/todos" path


const PORT = process.env.PORT || 4000;

// Define the Mongoose schemas for nested objects
const venueSchema = new mongoose.Schema({
  venue_id: String,
  name: String,
  location: String,
  country: String,
  timezone: String,
});

const competitionSchema = new mongoose.Schema({
  cid: Number,
  title: String,
  abbr: String,
  type: String,
  category: String,
  match_format: String,
  season: String,
  status: String,
  datestart: String,
  dateend: String,
  country: String,
  total_matches: String,
  total_rounds: String,
  total_teams: String,
});

const teamSchema = new mongoose.Schema({
  team_id: Number,
  name: String,
  short_name: String,
  logo_url: String,
  scores_full: String,
  scores: String,
  overs: String,
});

const matchSchema = new mongoose.Schema({
  match_id: Number,
  title: String,
  short_title: String,
  subtitle: String,
  match_number: String,
  format: Number,
  format_str: String,
  status: Number,
  status_str: String,
  status_note: String,
  verified: String,
  pre_squad: String,
  odds_available: String,
  game_state: Number,
  game_state_str: String,
  domestic: String,
  competition: competitionSchema,
  teama: teamSchema,
  teamb: teamSchema,
  date_start: String,
  date_end: String,
  timestamp_start: Number,
  timestamp_end: Number,
  date_start_ist: String,
  date_end_ist: String,
  venue: venueSchema,
  umpires: String,
  referee: String,
  equation: String,
  live: String,
  result: String,
  result_type: Number,
  win_margin: String,
  winning_team_id: Number,
  commentary: Number,
  wagon: Number,
  latest_inning_number: Number,
  presquad_time: String,
  verify_time: String,
  match_dls_affected: String,
  weather: [],
  pitch: {
    pitch_condition: String,
    batting_condition: String,
    pace_bowling_condition: String,
    spine_bowling_condition: String,
  },
  toss: {
    text: String,
    winner: Number,
    decision: Number,
  },
});

const Match = mongoose.model("Match", matchSchema);

const port = 4001

// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
);

const Todo = mongoose.model("matchSchema", matchSchema);







app.get('/list', async (req, res) => {
  try {
    const matches = await Todo.find({
    }).exec();
    console.log(matches,"dsfdhgafgdhas")
    res.json(matches); // Send matches as JSON in the response
  } catch (err) {
    console.error('Error fetching matches:', err);
  }
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.get('/list1', async (req, res) => {
  try {
    const dateRange = req.query.dateRange;
    
    // Split the date range into start and end dates
    const [startDate, endDate] = dateRange.split('_');

  
   
const matches = await Todo.find({
  $expr: {
    $and: [
      {
        $gte: [
          { $toDate: "$date_start" }, // Convert the string date to a Date object
          new Date(startDate) // Convert the startDate to a Date object
        ]
      },
      {
        $lte: [
          { $toDate: "$date_start" }, // Convert the string date to a Date object
          new Date(endDate) // Convert the endDate to a Date object
        ]
      }
    ]
  }
}).exec();


    res.json(matches); // Send matches as JSON in the response
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








