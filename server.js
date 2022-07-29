const { getUserSelection } = require("./utils/userOptions");
const mysql = require("mysql2");

// DB Connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "employees_db",
    }
    // console.log('Connected to the employees_db database')
);



function init() {
    // Logo
    console.log(String.raw`
     _____                       _                              
    | ____|  _ __ ___    _ __   | |   ___    _   _    ___    ___ 
    |  _|   |  _   _ \  |  _ \  | |  / _ \  | | | |  / _ \  / _ \
    | |___  | | | | | | | |_) | | | | (_) | | |_| | |  __/ |  __/
    |_____| |_| |_| |_| | .__/  |_|  \___/   \__, |  \___|  \___|
                        |_|                  |___/               
      __  __                                                     
    |  \/  |   __ _   _ __     __ _    __ _    ___   _ __        
    | |\/| |  / _  | |  _ \   / _  |  / _  |  / _ \ |  __|      
    | |  | | | (_| | | | | | | (_| | | (_| | |  __/ | |          
    |_|  |_|  \__,_| |_| |_|  \__,_|  \__, |  \___| |_|          
                                      |___/                      
    `);

    getUserSelection(db);
}

// Star program
init();
