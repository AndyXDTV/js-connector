// Import the RethinkDB driver
const r = require('rethinkdb');

// RethinkDB connection configuration
const host = '157.230.118.51'; // Replace with your RethinkDB host address
const port = 28015;       // Replace with your custom RethinkDB port
const dbName = 'mmorpg';  // Replace with your database name

// Function to get the leaderboard data
async function getLeaderboardData() {
  let connection;

  try {
    // Connect to RethinkDB server with custom port
    connection = await r.connect({ host, port });

    const database = r.db(dbName);

    // Rest of the code remains the same...
    const leaderboardData = await database.table('users')
      .orderBy(r.desc('mapId'))
      .run(connection)
      .toArray();

    return leaderboardData;
  } catch (error) {
    console.error('Error connecting to RethinkDB:', error.message);
    return [];
  } finally {
    // Close the connection after use
    if (connection) {
      connection.close();
    }
  }
}

// Function to get the top N players from the leaderboard
async function getTopPlayers(limit = 10) {
  let connection;

  try {
    // Connect to RethinkDB server with custom port
    connection = await r.connect({ host, port });

    const database = r.db(dbName);

    // Rest of the code remains the same...
    // Fetch data and sort by scores in descending order, limit to $limit players
    const cursor = await database
      .table('users')
      .orderBy(r.desc('mapId'))
      .limit(limit)
      .run(connection);

    // Convert the cursor to an array of data
    const topPlayersData = await cursor.toArray();
    return topPlayersData;
  } catch (error) {
    console.error('Error connecting to RethinkDB:', error.message);
    return [];
  } finally {
    // Close the connection after use
    if (connection) {
      connection.close();
    }
  }
}

module.exports = {
  getLeaderboardData,
  getTopPlayers,
};