// // require('dotenv').config();
// const http = require("http");
// const axios = require("axios");
// const mongoose = require("mongoose");
// const express = require('express');

// const app = express();



// // Define a route to handle GET requests at the "/todos" path


// const PORT = process.env.PORT || 4000;



// // Define the Mongoose schemas for nested objects
// const venueSchema = new mongoose.Schema({
//   venue_id: String,
//   name: String,
//   location: String,
//   country: String,
//   timezone: String,
// });

// const competitionSchema = new mongoose.Schema({
//   cid: Number,
//   title: String,
//   abbr: String,
//   type: String,
//   category: String,
//   match_format: String,
//   season: String,
//   status: String,
//   datestart: String,
//   dateend: String,
//   country: String,
//   total_matches: String,
//   total_rounds: String,
//   total_teams: String,
// });

// const teamSchema = new mongoose.Schema({
//   team_id: Number,
//   name: String,
//   short_name: String,
//   logo_url: String,
//   scores_full: String,
//   scores: String,
//   overs: String,
// });

// const matchSchema = new mongoose.Schema({
//   match_id: Number,
//   title: String,
//   short_title: String,
//   subtitle: String,
//   match_number: String,
//   format: Number,
//   format_str: String,
//   status: Number,
//   status_str: String,
//   status_note: String,
//   verified: String,
//   pre_squad: String,
//   odds_available: String,
//   game_state: Number,
//   game_state_str: String,
//   domestic: String,
//   competition: competitionSchema,
//   teama: teamSchema,
//   teamb: teamSchema,
//   date_start: String,
//   date_end: String,
//   timestamp_start: Number,
//   timestamp_end: Number,
//   date_start_ist: String,
//   date_end_ist: String,
//   venue: venueSchema,
//   umpires: String,
//   referee: String,
//   equation: String,
//   live: String,
//   result: String,
//   result_type: Number,
//   win_margin: String,
//   winning_team_id: Number,
//   commentary: Number,
//   wagon: Number,
//   latest_inning_number: Number,
//   presquad_time: String,
//   verify_time: String,
//   match_dls_affected: String,
//   weather: [],
//   pitch: {
//     pitch_condition: String,
//     batting_condition: String,
//     pace_bowling_condition: String,
//     spine_bowling_condition: String,
//   },
//   toss: {
//     text: String,
//     winner: Number,
//     decision: Number,
//   },
// });



// // Connect to your MongoDB database
// mongoose.connect(
//   "mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority"
// );

// const Todo = mongoose.model("matchSchema", matchSchema);




// const currentDate = new Date();

// // Extract date components
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
// const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// // Format the date
// var formattedDate = `${year}-${month}-${day}`;







// // Get the current date
// const currentDatet = new Date();

// // Get the date after two days
// const twoDaysLater = new Date();
// twoDaysLater.setDate(currentDatet.getDate() - 1);

// // Extract date components
// const tyear = twoDaysLater.getFullYear();
// const tmonth = String(twoDaysLater.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with leading zero if needed
// const tday = String(twoDaysLater.getDate()).padStart(2, '0'); // Pad day with leading zero if needed

// // Format the date
// var tformattedDate = `${tyear}-${tmonth}-${tday}`;
// console.log(tformattedDate, "tformatrdate")
// console.log(formattedDate,"formateeddate")
















// // Function to fetch and save data from the external API
// const fetchDataAndSave = async () => {
//   try {
//     // Fetch data from the external API
//     console.log("Fetching data from the external API...");
//     const response = await axios.get(
//       `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=1&per_page=100&token=73d62591af4b3ccb51986ff5f8af5676`
//     );
//     const todos = response.data.response.items;
//     console.log(todos,"todosapp")
//     console.log("Data fetched successfully from the external API.");

//     // Update or create documents based on match_id
//     for (const todo of todos) {
//       if (todo.teama) {
//         const {
//           team_id,
//           name,
//           short_name,
//           logo_url,
//           scores_full,
//           scores,
//           overs,
//         } = todo.teama;
    
//         // Find the existing document in MongoDB by match_id
//         const existingDocument = await Todo.findOne({ match_id: todo.match_id });
    
//         if (existingDocument) {
//           // If the document already exists, update only the relevant fields
//           await Todo.findOneAndUpdate(
//             { match_id: todo.match_id },
//             {
//               $set: {
//                 team_id,
//                 name,
//                 short_name,
//                 logo_url,
//                 scores_full,
//                 scores,
//                 overs,
//                 // Add other fields as needed
//               },
//             }
//           );
//         } else {
//           // If the document doesn't exist, create a new one
//           await Todo.create({
//             match_id: todo.match_id,
//             team_id,
//             name,
//             short_name,
//             logo_url,
//             scores_full,
//             scores,
//             overs,
//             // Add other fields as needed
//           });
//         }
//       } else {
//         console.warn(`No data available for Team A in match ${todo.match_id}`);
//       }
//     }
    

//     console.log("Data saved in MongoDB.");
//   } catch (error) {
//     console.error("Error fetching and saving data:", error);
//   }
// };





// // const fetchDataAndSave = async () => {
// //   try {
// //     let currentPage = 1;

// //     // Fetch the first page to get the total number of pages
// //     const initialResponse = await axios.get(
// //       `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
// //     );

// //     const totalPages = initialResponse.data.response.total_pages;

// //     while (currentPage <= totalPages) {
// //       // Fetch data from the external API for the specified date and page
// //       console.log(`Fetching data from the external API for date ${tformattedDate}, page ${currentPage}...`);
// //       const response = await axios.get(
// //         `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
// //       );
// //       const todos = response.data.response.items;

// //       // Update or create documents based on match_id
// //       for (const todo of todos) {
// //         await Todo.findOneAndUpdate(
// //           { match_id: todo.match_id },
// //           todo,
// //           { upsert: true }
// //         );
// //       }

// //       console.log(`Data fetched successfully from the external API for date ${formattedDate}, page ${currentPage}.`);

// //       // Increment the page number for the next iteration
// //       currentPage++;
// //     }

// //     console.log("Data saved in MongoDB.");
// //   } catch (error) {
// //     console.error("Error fetching and saving data:", error);
// //   }
// // };



// // const fetchDataAndSave = async () => {
// //   try {
// //     let currentPage = 1;
// //     let hasMoreData = true;

// //     while (hasMoreData) {
// //       // Fetch data from the external API for the specified date and page
// //       console.log(`Fetching data from the external API for date ${tformattedDate} and page ${currentPage}...`);
// //       const response = await axios.get(
// //         `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=${currentPage}&per_page=80&token=73d62591af4b3ccb51986ff5f8af5676`
// //       );
// //       const todos = response.data.response.items;

// //       if (todos.length === 0) {
// //         // If no more data is returned, exit the loop
// //         hasMoreData = false;
// //       } else {
// //         // Update or create documents based on match_id
// //         for (const todo of todos) {
// //           await Todo.findOneAndUpdate(
// //             { match_id: todo.match_id },
// //             todo,
// //             { upsert: true }
// //           );
// //         }

// //         console.log(`Data fetched successfully from the external API for date ${date} and page ${currentPage}.`);

// //         // Increment the page number for the next iteration
// //         currentPage++;
// //       }
// //     }

// //     console.log("Data saved in MongoDB.");
// //   } catch (error) {
// //     console.error("Error fetching and saving data:", error);
// //   }
// // };

























// // Fetch and save data initially and then every 10 seconds
// fetchDataAndSave();
// setInterval(fetchDataAndSave, 10000);



// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });

// // app.get('/list1', async (req, res) => {
// //   console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
// //   try {
// //     const dateRange = req.query.dateRange;
// //     console.log(dateRange,"daterange111111111111111111111111111111111111111")
    
// //     // Split the date range into start and end dates
// //     const [startDate, endDate] = dateRange.split('_');

  
   
// // const matches = await Todo.find({
// //   $expr: {
// //     $and: [
// //       {
// //         $gte: [
// //           { $toDate: "$date_start" }, // Convert the string date to a Date object
// //           new Date(startDate) // Convert the startDate to a Date object
// //         ]
// //       },
// //       {
// //         $lte: [
// //           { $toDate: "$date_start" }, // Convert the string date to a Date object
// //           new Date(endDate) // Convert the endDate to a Date object
// //         ]
// //       }
// //     ]
// //   }
// // }).exec();


// //     res.json(matches); // Send matches as JSON in the response
// //   } catch (err) {
// //     console.error('Error fetching matches:', err);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });



























// ----------------------------new  ---------------------------------------------------------

// index.js
const express = require('express');
const mongoose = require('mongoose');
// const port = 3000;

var cron = require("node-cron");
const axios = require("axios");
const cors = require('cors');

const app = express();


const PORT = process.env.PORT || 4000;


// This will allow all origins. In production, you might want to restrict this.
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000' // replace with your frontend domain
}));

const dbUrl = 'mongodb+srv://deepakkathuria32:deepak%401234@cluster0.590xfq1.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {});

const token = '73d62591af4b3ccb51986ff5f8af5676'

// Get the MongoDB connection object
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on("error", console.error.bind(console, "connection error:"));

// Execute code when the MongoDB connection is open
db.once("open", () => {
  console.log("Database connected");
});
// Define a simple schema and model

const Schema = mongoose.Schema;
const liveScoresSchema = new Schema({
  match_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: String,
  short_title: String,
  subtitle: String,
  date_start: Date,
  date_end: Date,
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
  competition_id: Number,
  competition_title: String,
  competition_abbreviation: String,
  competition_type: String,
  competition_category: String,
  competition_match_format: String,
  competition_season: String,
  competition_status: String,
  competition_start_date: Date,
  competition_end_date: Date,
  competition_country: String,
  competition_total_matches: String,
  competition_total_rounds: String,
  competition_total_teams: String,
  teama_team_id: Number,
  teama_name: String,
  teama_short_name: String,
  teama_logo_url: String,
  teama_scores_full: String,
  teama_scores: String,
  teama_overs: String,
  teamb_team_id: Number,
  teamb_name: String,
  teamb_short_name: String,
  teamb_logo_url: String,
  teamb_scores_full: String,
  teamb_scores: String,
  teamb_overs: String,
  start_date: Date,
  end_date: Date,
  start_timestamp: Number,
  end_timestamp: Number,
  start_date_ist: Date,
  end_date_ist: Date,
  venue_id: Number,
  venue_name: String,
  venue_location: String,
  venue_country: String,
  venue_timezone: String,
  umpires: String,
  referee: String,
  equation: String,
  live: String,
  result: String,
  result_type: String,
  win_margin: String,
  winning_team_id: Number,
  commentary: Number,
  wagon: Number,
  latest_inning_number: Number,
  pre_squad_time: String,
  verify_time: String,
  match_dls_affected: String,
  weather: Schema.Types.Mixed,
  pitch_condition: String,
  batting_condition: String,
  pace_bowling_condition: String,
  spin_bowling_condition: String,
  toss_text: String,
  toss_winner: Number,
  toss_decision: Number,
  // Add other fields here
});

const fielderSchema = new mongoose.Schema({
  fielder_id: String,
  fielder_name: String,
  catches: Number,
  runout_thrower: Number,
  runout_catcher: Number,
  runout_direct_hit: Number,
  stumping: Number,
  is_substitute: String,
});

const commentarySchema = new mongoose.Schema({
  event_id: String,
  event: String,
  batsman_id: String,
  bowler_id: String,
  over: String,
  ball: String,
  score: Number,
  commentary: String,
  noball_dismissal: Boolean,
  text: String,
  timestamp: Number,
  run: Number,
  noball_run: String,
  wide_run: String,
  bye_run: String,
  legbye_run: String,
  bat_run: String,
  noball: Boolean,
  wideball: Boolean,
  six: Boolean,
  four: Boolean,
});

const batsmanSchema = new mongoose.Schema({
  name: String,
  batsman_id: Number,
  runs: Number,
  balls_faced: Number,
  fours: Number,
  sixes: Number,
  strike_rate: String,
});

const bowlerSchema = new mongoose.Schema({
  name: String,
  bowler_id: Number,
  overs: Number,
  runs_conceded: Number,
  wickets: Number,
  maidens: Number,
  econ: String,
});

const inningSchema = new mongoose.Schema({
  iid: Number,
  number: Number,
  name: String,
  short_name: String,
  status: Number,
  issuperover: String,
  result: Number,
  batting_team_id: Number,
  fielding_team_id: Number,
  scores: String,
  scores_full: String,
  fielder: [fielderSchema],
});

const playerSchema = new mongoose.Schema({
  pid: Number,
  title: String,
  short_name: String,
  first_name: String,
  last_name: String,
  middle_name: String,
  birthdate: Date,
  birthplace: String,
  country: String,
  primary_team: [String],
  logo_url: String,
  playing_role: String,
  batting_style: String,
  bowling_style: String,
  fielding_position: String,
  recent_match: Number,
  recent_appearance: Number,
  fantasy_player_rating: Number,
  alt_name: String,
  facebook_profile: String,
  twitter_profile: String,
  instagram_profile: String,
  debut_data: String,
  thumb_url: String,
  nationality: String,
  role: String,
  role_str: String,
});

const teamSchema = new mongoose.Schema({
  tid: Number,
  title: String,
  abbr: String,
  alt_name: String,
  type: String,
  thumb_url: String,
  logo_url: String,
  country: String,
  sex: String,
  scores_full: String,
  scores: String,
  overs: String,
});

const matchSchema = new mongoose.Schema({
  mid: Number,
  status: Number,
  status_str: String,
  game_state: Number,
  game_state_str: String,
  status_note: String,
  day_remaining_over: String,
  team_batting: String,
  team_bowling: String,
  live_inning_number: Number,
  date_start: String,
  date_end: String,
  live_score: {
    runs: Number,
    overs: Number,
    wickets: Number,
    target: Number,
    runrate: Number,
    required_runrate: Number,
  },
  commentary: Number,
  wagon: Number,
  batsmen: [batsmanSchema],
  bowlers: [bowlerSchema],
  commentaries: [commentarySchema],
  live_inning: inningSchema,
  players: [playerSchema],
  teams: [teamSchema],
},
{
  timestamps: true
}
);

const Match = mongoose.model('Match', matchSchema);


const Live_Scores = mongoose.model('Live_Scores_test', liveScoresSchema);





// Middleware to parse JSON requests
app.use(express.json());



// Get the current date
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

async function fetchLiveapi() {
  try {


    const response = await axios.get(
      `https://rest.entitysport.com/v2/matches?date=${tformattedDate}_${formattedDate}&paged=1&per_page=200&token=${token}`
    );

    const matchDataList = response.data.response.items;

    for (const matchData of matchDataList) {
      console.log(matchData.date_start,"matchingdata")

      // console.log(matchData, "matchdata")

      // Find the match by match_id in the database
      const existingMatch = await Live_Scores.findOne({ match_id: matchData.match_id });
      // console.log(existingMatch,"divine")

      // Function to handle null or undefined values
      function handleNullOrUndefined(value) {
        return value === null || value === undefined ? '' : value;
      }

      // Map API data to Mongoose model fields
      const matchObject = {
        match_id: handleNullOrUndefined(matchData.match_id),
        title: handleNullOrUndefined(matchData.title),
        short_title: handleNullOrUndefined(matchData.short_title),
        subtitle: handleNullOrUndefined(matchData.subtitle),
        match_number: handleNullOrUndefined(matchData.match_number),
        format: handleNullOrUndefined(matchData.format),
        format_str: handleNullOrUndefined(matchData.format_str),
        status: handleNullOrUndefined(matchData.status),
        status_str: handleNullOrUndefined(matchData.status_str),
        status_note: handleNullOrUndefined(matchData.status_note),
        verified: handleNullOrUndefined(matchData.verified),
        pre_squad: handleNullOrUndefined(matchData.pre_squad),
        odds_available: handleNullOrUndefined(matchData.odds_available),
        game_state: handleNullOrUndefined(matchData.game_state),
        game_state_str: handleNullOrUndefined(matchData.game_state_str),
        domestic: handleNullOrUndefined(matchData.domestic),
        competition_id: handleNullOrUndefined(matchData.competition.cid),
        competition_title: handleNullOrUndefined(matchData.competition.title),
        competition_abbreviation: handleNullOrUndefined(matchData.competition.abbr),
        competition_type: handleNullOrUndefined(matchData.competition.type),
        competition_category: handleNullOrUndefined(matchData.competition.category),
        competition_match_format: handleNullOrUndefined(matchData.competition.match_format),
        competition_season: handleNullOrUndefined(matchData.competition.season),
        competition_status: handleNullOrUndefined(matchData.competition.status),
        competition_start_date: handleNullOrUndefined(matchData.competition.date_start),
        competition_end_date: handleNullOrUndefined(matchData.competition.date_end),
        competition_country: handleNullOrUndefined(matchData.competition.country),
        competition_total_matches: handleNullOrUndefined(matchData.competition.total_matches),
        competition_total_rounds: handleNullOrUndefined(matchData.competition.total_rounds),
        competition_total_teams: handleNullOrUndefined(matchData.competition.total_teams),
        teama_team_id: handleNullOrUndefined(matchData.teama.team_id),
        teama_name: handleNullOrUndefined(matchData.teama.name),
        teama_short_name: handleNullOrUndefined(matchData.teama.short_name),
        teama_logo_url: handleNullOrUndefined(matchData.teama.logo_url),
        teama_scores_full: handleNullOrUndefined(matchData.teama.scores_full),
        teama_scores: handleNullOrUndefined(matchData.teama.scores),
        teama_overs: handleNullOrUndefined(matchData.teama.overs),
        teamb_team_id: handleNullOrUndefined(matchData.teamb.team_id),
        teamb_name: handleNullOrUndefined(matchData.teamb.name),
        teamb_short_name: handleNullOrUndefined(matchData.teamb.short_name),
        teamb_logo_url: handleNullOrUndefined(matchData.teamb.logo_url),
        teamb_scores_full: handleNullOrUndefined(matchData.teamb.scores_full),
        teamb_scores: handleNullOrUndefined(matchData.teamb.scores),
        teamb_overs: handleNullOrUndefined(matchData.teamb.overs),
        date_start: handleNullOrUndefined(matchData.date_start),
        date_end: handleNullOrUndefined(matchData.date_end),
        start_timestamp: handleNullOrUndefined(matchData.timestamp_start),
        end_timestamp: handleNullOrUndefined(matchData.timestamp_end),
        start_date_ist: handleNullOrUndefined(matchData.date_start_ist),
        end_date_ist: handleNullOrUndefined(matchData.date_end_ist),
        venue_id: handleNullOrUndefined(matchData.venue.venue_id),
        venue_name: handleNullOrUndefined(matchData.venue.name),
        venue_location: handleNullOrUndefined(matchData.venue.location),
        venue_country: handleNullOrUndefined(matchData.venue.country),
        venue_timezone: handleNullOrUndefined(matchData.venue.timezone),
        umpires: handleNullOrUndefined(matchData.umpires),
        referee: handleNullOrUndefined(matchData.referee),
        equation: handleNullOrUndefined(matchData.equation),
        live: handleNullOrUndefined(matchData.live),
        result: handleNullOrUndefined(matchData.result),
        result_type: handleNullOrUndefined(matchData.result_type),
        win_margin: handleNullOrUndefined(matchData.win_margin),
        winning_team_id: handleNullOrUndefined(matchData.winning_team_id),
        commentary: handleNullOrUndefined(matchData.commentary),
        wagon: handleNullOrUndefined(matchData.wagon),
        latest_inning_number: handleNullOrUndefined(matchData.latest_inning_number),
        pre_squad_time: handleNullOrUndefined(matchData.presquad_time),
        verify_time: handleNullOrUndefined(matchData.verify_time),
        match_dls_affected: handleNullOrUndefined(matchData.match_dls_affected),
        weather: handleNullOrUndefined(matchData.weather),
        pitch_condition: handleNullOrUndefined(matchData.pitch?.pitch_condition),
        batting_condition: handleNullOrUndefined(matchData.pitch?.batting_condition),
        pace_bowling_condition: handleNullOrUndefined(matchData.pitch?.pace_bowling_condition),
        spin_bowling_condition: handleNullOrUndefined(matchData.pitch?.spin_bowling_condition),
        toss_text: handleNullOrUndefined(matchData.toss?.text),
        toss_winner: handleNullOrUndefined(matchData.toss?.winner),
        toss_decision: handleNullOrUndefined(matchData.toss?.decision),
      };

      if (existingMatch && matchData.status_str !== 'completed') {
        await Live_Scores.findByIdAndUpdate(existingMatch._id, matchObject);
        // console.log('Match updated successfully.');
      } else {
        await Live_Scores.create(matchObject);
        // console.log('Match Created Successfully')
      }
    }
  } catch (error) {
    console.error('Error calling API:', error);
  }
}












async function fetchMatchLiveapi(matchid) {

  try {

    const response = await axios.get(
      `https://rest.entitysport.com/v2/matches/${matchid}/live?token=${token}`
    );

    const matchData = response.data.response;




    function handleNullOrUndefined(value) {
      return value === null || value === undefined ? '' : value;
    }

    const matchObject = {
      mid: handleNullOrUndefined(matchData.mid),
      status: handleNullOrUndefined(matchData.status),
      status_str: handleNullOrUndefined(matchData.status_str),
      game_state: handleNullOrUndefined(matchData.game_state),
      game_state_str: handleNullOrUndefined(matchData.game_state_str),
      status_note: handleNullOrUndefined(matchData.status_note),
      day_remaining_over: handleNullOrUndefined(matchData.day_remaining_over),
      team_batting: handleNullOrUndefined(matchData.team_batting),
      team_bowling: handleNullOrUndefined(matchData.teama_bowling),
      live_inning_number: handleNullOrUndefined(matchData.latest_inning_number),
      date_start: handleNullOrUndefined(matchData.start_date),
      date_end: handleNullOrUndefined(matchData.end_date),
      live_score: {
        runs: handleNullOrUndefined(matchData.live?.run),
        overs: handleNullOrUndefined(matchData.live?.over),
        wickets: handleNullOrUndefined(matchData.live?.wickets),
        target: handleNullOrUndefined(matchData.equation?.runs),
        runrate: handleNullOrUndefined(matchData.live?.runrate),
        required_runrate: handleNullOrUndefined(matchData.equation?.required_runrate),
      },
      commentary: handleNullOrUndefined(matchData.commentary),
      wagon: handleNullOrUndefined(matchData.wagon),
      batsmen: matchData.batsmen.map((batsman) => ({
        name: handleNullOrUndefined(batsman.name),
        batsman_id: handleNullOrUndefined(batsman.batsman_id),
        runs: handleNullOrUndefined(batsman.runs),
        balls_faced: handleNullOrUndefined(batsman.balls_faced),
        fours: handleNullOrUndefined(batsman.fours),
        sixes: handleNullOrUndefined(batsman.sixes),
        strike_rate: handleNullOrUndefined(batsman.strike_rate),
      })),
      bowlers: matchData.bowlers.map((bowler) => ({
        name: handleNullOrUndefined(bowler.name),
        bowler_id: handleNullOrUndefined(bowler.bowler_id),
        overs: handleNullOrUndefined(bowler.overs),
        runs_conceded: handleNullOrUndefined(bowler.runs_conceded),
        wickets: handleNullOrUndefined(bowler.wickets),
        maidens: handleNullOrUndefined(bowler.maidens),
        econ: handleNullOrUndefined(bowler.econ),
      })),
      commentaries: matchData.commentaries.map((commentary) => ({
        event_id: handleNullOrUndefined(commentary.event_id),
        event: handleNullOrUndefined(commentary.event),
        batsman_id: handleNullOrUndefined(commentary.batsman_id),
        bowler_id: handleNullOrUndefined(commentary.bowler_id),
        over: handleNullOrUndefined(commentary.over),
        ball: handleNullOrUndefined(commentary.ball),
        score: Number(commentary.score) || 0,
        commentary: handleNullOrUndefined(commentary.commentary),
        noball_dismissal: Boolean(commentary.noball_dismissal),
        text: handleNullOrUndefined(commentary.text),
        timestamp: handleNullOrUndefined(commentary.timestamp),
        run: handleNullOrUndefined(commentary.run),
        noball_run: handleNullOrUndefined(commentary.noball_run),
        wide_run: handleNullOrUndefined(commentary.wide_run),
        bye_run: handleNullOrUndefined(commentary.bye_run),
        legbye_run: handleNullOrUndefined(commentary.legbye_run),
        bat_run: handleNullOrUndefined(commentary.bat_run),
        noball: commentary.noball === "" ? null : Boolean(commentary.noball),
        wideball: Boolean(commentary.wideball),
        six: Boolean(commentary.six),
        four: Boolean(commentary.four),
      })),
      live_inning: {
        iid: handleNullOrUndefined(matchData.live_inning?.iid),
        number: handleNullOrUndefined(matchData.live_inning?.number),
        name: handleNullOrUndefined(matchData.live_inning?.name),
        short_name: handleNullOrUndefined(matchData.live_inning?.short_name),
        status: handleNullOrUndefined(matchData.live_inning?.status),
        issuperover: handleNullOrUndefined(matchData.live_inning?.issuperover),
        result: handleNullOrUndefined(matchData.live_inning?.result),
        batting_team_id: handleNullOrUndefined(matchData.live_inning?.batting_team_id),
        fielding_team_id: handleNullOrUndefined(matchData.live_inning?.fielding_team_id),
        scores: handleNullOrUndefined(matchData.live_inning?.scores),
        scores_full: handleNullOrUndefined(matchData.live_inning?.scores_full),
        fielder: matchData.live_inning?.fielder.map((fielder) => ({
          fielder_id: handleNullOrUndefined(fielder.fielder_id),
          fielder_name: handleNullOrUndefined(fielder.fielder_name),
          catches: handleNullOrUndefined(fielder.catches),
          runout_thrower: handleNullOrUndefined(fielder.runout_thrower),
          runout_catcher: handleNullOrUndefined(fielder.runout_catcher),
          runout_direct_hit: handleNullOrUndefined(fielder.runout_direct_hit),
          stumping: handleNullOrUndefined(fielder.stumping),
          is_substitute: handleNullOrUndefined(fielder.is_substitute),
        })),
      },
      players: matchData.players.map((player) => ({
        pid: handleNullOrUndefined(player.pid),
        title: handleNullOrUndefined(player.title),
        short_name: handleNullOrUndefined(player.short_name),
        first_name: handleNullOrUndefined(player.first_name),
        last_name: handleNullOrUndefined(player.last_name),
        middle_name: handleNullOrUndefined(player.middle_name),
        birthdate: handleNullOrUndefined(player.birthdate),
        birthplace: handleNullOrUndefined(player.birthplace),
        country: handleNullOrUndefined(player.country),
        primary_team: player.primary_team.map(handleNullOrUndefined),
        logo_url: handleNullOrUndefined(player.logo_url),
        playing_role: handleNullOrUndefined(player.playing_role),
        batting_style: handleNullOrUndefined(player.batting_style),
        bowling_style: handleNullOrUndefined(player.bowling_style),
        fielding_position: handleNullOrUndefined(player.fielding_position),
        recent_match: handleNullOrUndefined(player.recent_match),
        recent_appearance: handleNullOrUndefined(player.recent_appearance),
        fantasy_player_rating: handleNullOrUndefined(player.fantasy_player_rating),
        alt_name: handleNullOrUndefined(player.alt_name),
        facebook_profile: handleNullOrUndefined(player.facebook_profile),
        twitter_profile: handleNullOrUndefined(player.twitter_profile),
        instagram_profile: handleNullOrUndefined(player.instagram_profile),
        debut_data: handleNullOrUndefined(player.debut_data),
        thumb_url: handleNullOrUndefined(player.thumb_url),
        nationality: handleNullOrUndefined(player.nationality),
        role: handleNullOrUndefined(player.role),
        role_str: handleNullOrUndefined(player.role_str),
      })),
      teams: matchData.teams.map((team) => ({
        tid: handleNullOrUndefined(team.tid),
        title: handleNullOrUndefined(team.title),
        abbr: handleNullOrUndefined(team.abbr),
        alt_name: handleNullOrUndefined(team.alt_name),
        type: handleNullOrUndefined(team.type),
        thumb_url: handleNullOrUndefined(team.thumb_url),
        logo_url: handleNullOrUndefined(team.logo_url),
        country: handleNullOrUndefined(team.country),
        sex: handleNullOrUndefined(team.sex),
        scores_full: handleNullOrUndefined(team.scores_full),
        scores: handleNullOrUndefined(team.scores),
        overs: handleNullOrUndefined(team.overs),
      })),
    };


    if (!matchData) {
      // console.log(`No match data found for matchid: ${matchid}`);
      return;
    }


    const existingMatch = await Match.findOne({ mid: matchData.mid });


    if (existingMatch) {
      await Match.findByIdAndUpdate(existingMatch._id, matchObject);
      // console.log('Match LIVE updated successfully.');
    } else {
      await Match.create(matchObject);
    }

  } catch (error) {
    console.error('Error calling API:', error);
  }
}



async function fetchAndUpdateAllMatches() {
  const matchIds = await Live_Scores.find({}, 'match_id');

  // Extract the match_id values from the query result and create an array
  const matchIdArray = matchIds.map((match) => match.match_id);
  // console.log(matchIdArray, "matchidarray")

  for (const matchid of matchIdArray) {
    await fetchMatchLiveapi(matchid);
  }
}


// fetchAndUpdateAllMatches()
// fetchMatchLiveapi()















// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});







//fetch match id and then make url and get data live match api

cron.schedule("*/5 * * * * *", fetchAndUpdateAllMatches);



// these are all live match api which is runnning according to the date
cron.schedule("*/5 * * * * *", fetchLiveapi);






// ---------------------------------------get api for match list --------------------------------------------------



// app.get('/api/matchlist', async (req, res) => {
//   try {
//     const matches = await Match.find({
//     }).exec();
//     res.json(matches); // Send matches as JSON in the response
//   } catch (err) {
//     console.error('Error fetching matches:', err);
//   }
// });



// app.get('/api/matchlist', async (req, res) => {
//   try {
//     const matches = await Match.find({}).sort({ createdAt: -1 }).exec();
//     res.json(matches); // Send matches as JSON in the response
//   } catch (err) {
//     console.error('Error fetching matches:', err);
//     res.status(500).json({ error: 'Server error' });  // Respond with error to the client
//   }
// });

// // app.get('/api/matchlist', async (req, res) => {
// //   try {
// //     // Validate the presence of the date in the query string
// //     if (!req.query.date) {
// //       return res.status(400).send('Date parameter is required');
// //     }

// //     // Convert the string date to a JavaScript Date object
// //     const inputDate = new Date(req.query.date);

// //     // Validate the date
// //     if (isNaN(inputDate.getTime())) {
// //       return res.status(400).send('Invalid Date');
// //     }

// //     // Use the date to query the database
// //     const matches = await Live_Scores.find({
// //       start_date: inputDate.toISOString()
// //     }).exec();

// //     res.json(matches); // Send matches as JSON in the response
// //   } catch (err) {
// //     console.error('Error fetching matches:', err);
// //     res.status(500).send('Internal server error');
// //   }
// // });




// // app.get('/api/matchlist', async (req, res) => {
// //   try {
// //     const { date } = req.query;
// //     console.log(date,"date")

// //     if (!date) {
// //       return res.status(400).send('Date parameter is required');
// //     }

// //     // Convert the provided date string to a Date object
// //     // const queryDate = new Date(date);
// //     const queryDate  ='2023-07-28T22:00:00.000Z'

// //     // Fetch matches that are ongoing or happening on the given date
// //     const matches = await Match.find({
// //       start_date: { queryDate },
// //       // end_date: { $gte: queryDate }
// //     }).exec();

// //     res.json(matches); // Send matches as JSON in the response
// //   } catch (err) {
// //     console.error('Error fetching matches:', err);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });




// //feych data according to particular id
// app.get('/api/matches/:matchId', async (req, res) => {
//   const { matchId } = req.params;
//   try {
//     const match = await Live_Scores.findOne({ match_id: matchId }).exec();
//     if (!match) {
//       return res.status(404).json({ error: 'Match not found' });
//     }
//     res.json(match); // Send the match as JSON in the response
//   } catch (err) {
//     console.error('Error fetching match:', err);
//     res.status(500).json({ error: 'Error fetching match' });
//   }
// });

// //fetch live data according to match id 
// app.get('/api/fetchlive/:matchId', async (req, res) => {
//   const { matchId } = req.params;
//   try {
//     const match = await Match.findOne({ mid: matchId }).exec();
//     if (!match) {
//       return res.status(404).json({ error: 'Match not found' });
//     }
//     res.json(match); // Send the match as JSON in the response
//   } catch (err) {
//     console.error('Error fetching match:', err);
//     res.status(500).json({ error: 'Error fetching match' });
//   }
// });



// app.get('/api/fetchlivedata', async (req, res) => {
//   try {
//     // const { dateRange } = req.query; // Extract the dateRange from query parameters

//     // if (!dateRange) {
//     //   return res.status(400).json({ error: 'Missing dateRange query parameter.' });
//     // }

//     // // Split the dateRange into startDate and endDate
//     // const [startDate, endDate] = dateRange.split('_');

//     // if (!startDate || !endDate) {
//     //   return res.status(400).json({ error: 'Invalid dateRange format. Expected format: YYYY-MM-DD_YYYY-MM-DD' });
//     // }

//     // Query the database for matches within the given date range
//     const matches = await Live_Scores.find({
//     }).exec();

//     res.json(matches); // Send matches as JSON in the response
//   } catch (err) {
//     console.error('Error fetching matches:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
