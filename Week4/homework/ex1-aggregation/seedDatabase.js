const records = require("./population_pyramid_1950-2022.json");

const seedDatabase = async (client) => {
  const db = client.db("databaseWeek4");
  const collection = db.collection("statistics");

  // Insert records into the database
  await collection.insertMany(records, (err, result) => {
    if (err) {
      console.error("Error inserting records:", err);
    } else {
      console.log(`${result.insertedCount} records inserted successfully`);
    }

    // Close the connection
    client.close();
  });
};

module.exports = {
  seedDatabase,
};
