import dotenv from 'dotenv';
dotenv.config();

const dbConnect = require("./dbConnect");
dbConnect();

const ApikeyService = require("../services/apikey.service");

async function insertAPI() {
  try {
    let api_key = await ApikeyService.getAll({ api_key: "abc123" });
    if (api_key) {
        console.log("Sample API Key is already migrated.");
        console.log(api_key);
    } else {
        
        const data = {
                      api_key: "abc123",
                      username: "fritz"  
                    };

        const newApi = await ApikeyService.create(data);
        if (newApi) {
            console.log("New entry migrated successfully.");
            console.log(newApi);
        } else {
          console.error("Migration Failed.");
        }
    }  
  } catch (error) {
    console.log('Error inserting api key:');
    console.error(error);
  }
  process.exit(0);    
}

const RoleService = require("../services/role.service");
async function insertRoles() {
  try {
    const rolesData = [
      { name: 'admin'},
      { name: 'user'},
      { name: 'editor'},
      { name: 'author'}
    ];

    await RoleService.insertMany(rolesData);
    console.log('Roles inserted successfully');  
  } catch (error) {
    console.error('Error inserting api key:');
    console.error(error);
  }
  //process.exit(0);    
}

async function migration() {
  insertRoles();
  insertAPI();  
}
migration();