import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

connection.query("truncate invitee");
connection.query("truncate Room");
connection.query("truncate Meeting");

const create_Invitee_table = "create table if not exists Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))";

connection.query(create_Invitee_table, (error) => {
  if (error) {
    throw error;
  }
  console.log("Your Invitee table is ready to use");
});

const insert_Invitee_queries = ["(1, 'Zehra', 'Zek')", "(2, 'Lisa', 'Linda')", " (3, 'Alp', 'Liz')", "(4, 'Zeynep', 'Ali')", " (5, 'John', 'Elif')"];
const insert_Invitee_text = "insert into Invitee values";

for (let i = 0; i < insert_Invitee_queries.length; i++) {
  connection.query(`${insert_Invitee_text} ${insert_Invitee_queries[i]}`, function (error) {
    if (error) {
      throw error;
    }
  });
}

const create_Room_table = "create table if not exists Room (room_no int, room_name varchar(50), floor_number int)";

connection.query(create_Room_table, (error) => {
  if (error) {
    throw error;
  }
  console.log("Your Room table is ready to use");
});

const insert_Room_text = "insert into Room values";
const insert_Room_queries = ["(1, 'flower', '101')", "(2, 'sun', '102')", "(3, 'mountain', '103')", "(4, 'tree', '104')", "(5, 'stone', '105')"];

for (let i = 0; i < insert_Room_queries.length; i++) {
  connection.query(`${insert_Room_text} ${insert_Room_queries[i]}`, function (error) {
    if (error) {
      throw error;
    }
  });
}

const create_Meeting_table =
  "create table if not exists Meeting (meeting_no int, meeting_title varchar(50), starting_time time, ending_time time, room_no int)";

connection.query(create_Meeting_table, (error) => {
  if (error) {
    throw error;
  }
  console.log("Your Meeting table is ready to use");
});

const insert_Meeting_text = "insert into Meeting values";
const insert_Meeting_queries = [
  "(1, 'Learning SQL', '09:00:00', '15:30:00', 101 )",
  "(2, 'important meeting', '13:00:00', '15:00:00', 102)",
  "(3, 'Learning JS', '11:00:00', '15:30:00', 103 )",
  "(4, 'Learning mongodb', '09:00:00', '13:30:00', 104)",
  "(5, 'free meeting', '13:00:00', '15:30:00', 105 )",
];

for (let i = 0; i < insert_Meeting_queries.length; i++) {
  connection.query(`${insert_Meeting_text} ${insert_Meeting_queries[i]}`, function (error) {
    if (error) {
      throw error;
    }
  });
}

connection.end();
