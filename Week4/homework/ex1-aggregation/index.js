const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function getCollection(client) {
  return await client.db("databaseWeek4").collection("statistics");
}

async function calculatePopulations(client, country) {
  try {
    const collection = await getCollection(client);
    const query = [
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
      {
        $project: {
          _id: 0,
          Year: "$_id",
          countPopulation: 1,
        },
      },
    ];

    const result = await collection.aggregate(query).toArray();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
async function calculateContinentInfo(client, year, age) {
  try {
    const collection = await getCollection(client);
    const query = [
      { $match: { Year: year, Age: { $gte: age } } },
      {
        $group: {
          _id: "$Continent",
          TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
          Info: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          Continent: "$_id",
          TotalPopulation: 1,
          Info: 1,
        },
      },
    ];

    const result = await collection.aggregate(query).toArray();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  let connectionString = "mongodb+srv://zehrakocairi:*******@cluster0.qzpvjfn.mongodb.net/";

  const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await seedDatabase(client);

    await calculatePopulations(client, "Netherlands");

    await getContinentInfo(client, 2020, "100+");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
