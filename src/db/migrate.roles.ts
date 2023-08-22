const RoleService = require("../services/role.service");

async function runMigration() {
  try {

    const roleNames = ["admin", "user", "editor", "author"];
    /* let i = 0;
    while (i < roleNames.length) {
      let newRole = roleNames[i];
      i++;
      const dataRole = new Role({
        name: newRole,
      });

      const newApi = await dataRole.save();
    } */
    const roles = [
      { name: 'admin'},
      { name: 'user'},
      { name: 'editor'},
      { name: 'author'}
    ];

    const result = await RoleService.insertMany(roles);
    console.log("User Roles migration completed.");
  } catch (error: any) {
    console.log("Error during migration");
    console.error(error.message);
  }
  process.exit(0);

}

runMigration();