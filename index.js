// require('dotenv').config();
const http = require("http");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require('express');

const app = express();



// Define a route to handle GET requests at the "/todos" path


const PORT = process.env.PORT || 3000;



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



// Connect to your MongoDB database
mongoose.connect(
  "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
);

const Todo = mongoose.model("matchSchema", matchSchema);




const currentDate = new Date();

// Extract date components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// Format the date
var formattedDate = `${year}-${month}-${day}`;







// Get the current date
const currentDatet = new Date();

// Get the date after two days
const twoDaysLater = new Date();
twoDaysLater.setDate(currentDatet.getDate() - 1);

// Extract date components
const tyear = twoDaysLater.getFullYear();
const tmonth = String(twoDaysLater.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
const tday = String(twoDaysLater.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// Format the date
var tformattedDate = `${tyear}-${tmonth}-${tday}`;
console.log(tformattedDate, "tformatrdate")
console.log(formattedDate,"formateeddate")
















// Function to fetch and save data from the external API
const fetchDataAndSave = async () => {
  try {
    // Fetch data from the external API
    console.log("Fetching data from the external API...");
    const response = await axios.get(
      `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=1&per_page=100&token=73d62591af4b3ccb51986ff5f8af5676`
    );
    const todos = response.data.response.items;
    console.log("Data fetched successfully from the external API.");

    // Update or create documents based on match_id
    for (const todo of todos) {
      await Todo.findOneAndUpdate(
        { match_id: todo.match_id },
        todo,
        { upsert: true }
      );
    }

    console.log("Data saved in MongoDB.");
  } catch (error) {
    console.error("Error fetching and saving data:", error);
  }
};

// Fetch and save data initially and then every 10 seconds
fetchDataAndSave();
setInterval(fetchDataAndSave, 10000);

// const server = http.createServer((req, res) => {
//   if (req.url === "/todos") {
//     Todo.find({}, (err, todos) => {
//       if (err) {
//         console.error("Error querying data:", err);
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end("Internal Server Error");
//       } else {
//         // Set the content type to JSON
//         res.writeHead(200, { "Content-Type": "application/json" });

//         // Send the queried data as JSON
//         res.end(JSON.stringify(todos));
//       }
//     });
//   } else {
//     // Handle other routes or paths here
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });


// app.get('/list', async (req, res) => {
//   console.log("hiyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
//   try {
//     const matches = await Todo.find({
//     }).exec();
//     console.log(matches,"dsfdhgafgdhas")
//     res.json(matches); // Send matches as JSON in the response
//   } catch (err) {
//     console.error('Error fetching matches:', err);
//   }
// });


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// app.get('/list1', async (req, res) => {
//   console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
//   try {
//     const dateRange = req.query.dateRange;
//     console.log(dateRange,"daterange111111111111111111111111111111111111111")
    
//     // Split the date range into start and end dates
//     const [startDate, endDate] = dateRange.split('_');

  
   
// const matches = await Todo.find({
//   $expr: {
//     $and: [
//       {
//         $gte: [
//           { $toDate: "$date_start" }, // Convert the string date to a Date object
//           new Date(startDate) // Convert the startDate to a Date object
//         ]
//       },
//       {
//         $lte: [
//           { $toDate: "$date_start" }, // Convert the string date to a Date object
//           new Date(endDate) // Convert the endDate to a Date object
//         ]
//       }
//     ]
//   }
// }).exec();


//     res.json(matches); // Send matches as JSON in the response
//   } catch (err) {
//     console.error('Error fetching matches:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });








