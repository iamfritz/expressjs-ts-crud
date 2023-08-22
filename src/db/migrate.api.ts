const ApikeyService = require("../services/apikey.service");

async function runMigration() {
  try {

    let api_key = await ApikeyService.getMany({ api_key: "abc123" });
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
  } catch (error: any) {
    console.log("Error during migration");
    console.error(error.message);
  }
  process.exit(0);
}

runMigration();