import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

connection.query("select Name from city where Population > 8000000", (_, data) => {
  const cities = data.map((d) => d.Name);

  if (cities.length > 0) {
    console.log("The names of countries with population greater than 8 million :" + cities);
  } else {
    console.error("no city has more then 8000000 population!");
  }
});

connection.query("select Name from city where Name like '%land%'", (_, data) => {
  const cities = data.map((d) => d.Name);

  if (cities.length > 0) {
    console.log("The names of countries that have “land” in their names:" + cities);
  } else {
    console.error("no city has “land” in their name!");
  }
});

connection.query("select Name from city where Population BETWEEN 500000 and 1000000", (_, data) => {
  const cities = data.map((d) => d.Name);

  if (cities.length > 0) {
    console.log("The names of the cities with population in between 500,000 and 1 million?:" + cities);
  } else {
    console.error("There is no city with a population between 500,000 and 1 million");
  }
});

connection.query("select Name from country where Continent='Europe'", (_, data) => {
  const countries = data.map((d) => d.Name);

  if (countries.length > 0) {
    console.log("The name of all the countries on the continent ‘Europe’:" + countries);
  } else {
    console.error("There is no country on the continent ‘Europe’!");
  }
});

connection.query("select Name from country order by SurfaceArea desc", (_, data) => {
  const countries = data.map((d) => d.Name);

  if (countries.length > 0) {
    console.log("The countries in the descending order of their surface areas:" + countries);
  } else {
    console.error("There is no country!");
  }
});

connection.query("SELECT Name FROM city where CountryCode='NLD'", (_, data) => {
  const countries = data.map((d) => d.Name);

  if (countries.length > 0) {
    console.log("The names of all the cities in the Netherlands:" + countries);
  } else {
    console.error("There is no city!");
  }
});

connection.query("SELECT Population FROM city where Name='Rotterdam'", (_, data) => {
  if (data) {
    console.log("The population of Rotterdam is " + data[0].Population);
  } else {
    console.error("There is no data!");
  }
});

connection.query("SELECT Name FROM country order by SurfaceArea desc limit 10", (_, data) => {
  const countries = data.map((d) => d.Name);

  if (countries.length > 0) {
    console.log("The top 10 countries by Surface Area: " + countries);
  } else {
    console.error("There is no data!");
  }
});

connection.query("SELECT Name FROM city order by Population desc limit 10", (_, data) => {
  const cities = data.map((d) => d.Name);

  if (cities.length > 0) {
    console.log("The top 10 most populated cities: " + cities);
  } else {
    console.error("There is no data!");
  }
});

connection.query("SELECT Population FROM country", (_, data) => {
  const totalWorldPopulation = data.map((d) => d.Population).reduce((a, b) => a + b, 0);

  if (data) {
    console.log("The population of the world is " + totalWorldPopulation);
  } else {
    console.error("There is no data!");
  }
});
