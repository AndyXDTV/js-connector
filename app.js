const leaderboard = require('./leaderboard');

async function displayLeaderboard() {
  // Fetch the top players' data
  const topPlayersData = await leaderboard.getTopPlayers(10);

  // Format and display the leaderboard
  console.log('Leaderboard:');
  console.log('Player Name    Score');
  topPlayersData.forEach((player) => {
    console.log(`${player.username}   ${player.mapId}`);
  });
}

// Call the function to display the leaderboard
displayLeaderboard();