import dotenv from 'dotenv';
dotenv.config();

const dbConnect = require("./dbConnect");
dbConnect();

const ApikeyService = require("../services/apikey.service");

async function insertAPI() {
  try {
    let apikey = await ApikeyService.getAll({ apikey: "abc123" });
    if (apikey.length === 0) {
        console.log("Sample API Key successfully migrated.");
        console.log(apikey);
    } else {
        
        const data = {
                      apikey: "abc123",
                      username: "fritz"  
                    };

        const newApi = await ApikeyService.create(data);
        if (newApi) {
            console.log("New API migrated successfully.");
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