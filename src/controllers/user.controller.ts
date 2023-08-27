//const User = require("../models/user.model");
//const Role = require("../models/role.model");
const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");

const auth = require("../middleware/authJWT");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds, higher is more secure but slower
const jwt = require("jsonwebtoken");

// Function to hash a password
async function hashPassword(password: String) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error: any) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

const getAllUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  try {
    
    const userItems = await UserService.getAllWithPopulation({}, "roles");
    const items = userItems.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    if (items.length === 0) {    
      result["status"] = "error";
      result["message"] = `No Record found.`;

      res.status(400).json(result);
    } else {    
      let { page, limit } = req.query;

      page = page ? parseInt(page) : 1;
      page = page <= 0 ? 1 : page;
      limit = limit ? parseInt(limit) : 10;
      limit = limit <= 0 ? 1 : limit;

      // calculating the starting and ending index
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      endIndex = endIndex > items.length ? items.length : endIndex;
      let totalPages = Math.ceil(items.length / limit);

      // Check if the start index is out of bounds
      if (startIndex >= items.length) {
        res
          .status(400)
          .json({ status: "error", message: "Page number out of range" });
      }

      let users = items.slice(startIndex, endIndex);
      result["status"] = "success";
      result["paging"] = {
        total: items.length,
        pages: totalPages,
        page: page,
        limit: limit,
      };
      const sanitizedUsers = users.map(sanitizeUser);    

      result["data"] = sanitizedUsers;

      res.json(result);
    } 
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;                                                                                                                                   

    res.status(500).json(result);
  }
};

//get user
const getUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };
  
  /* const isAdmin = req.user.roles.some((role) => role.name === "admin");
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  } */  
  try {
    const data = await UserService.getWithPopulation(req.params.id, "roles");
    if (data) {
      const sanitizedUser = sanitizeUser(data);
      result["status"] = "success";
      result["data"] = sanitizedUser;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;      
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//create a new user
const createUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  const { email, password, name, roles } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    // Find roles by name
    const foundRoles = await RoleService.getAll({ name: { $in: roles } });

    // Create the user and associate roles
    const data = {
      email,
      name,
      password : hashedPassword, // Remember to hash the password before saving it
      roles: foundRoles.map((role) => role._id),
    };
    
    const newUser = await UserService.create(data);
    // save the new user
    if (newUser) {
      result["status"] = "success";
      result["data"] = newUser;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to add a new record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }

};

//update user
const updateUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  const id = req.params.id;
  const { email, password, name, roles } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    // Find roles by name
    const foundRoles = await RoleService.getAll({ name: { $in: roles } });

    let dataUpdate = {
      email,
      name,
      roles: foundRoles.map((role) => role._id),
    };
    if(password) {
      dataUpdate['password'] = hashedPassword; // Remember to hash the password before saving it
    }

    const options = { new: true };
    const data = await UserService.update(id, dataUpdate, options);

    if (data) {
      result["status"] = "success";
      result["message"] = `Record has been updated.`;
      result["data"] = data;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to update a record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//delete user
const deleteUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };
  try {
    const data = await UserService.delete(req.params.id);
    if (data) {
      result["status"] = "success";
      result["message"] = `Record has been deleted.`;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to delete a record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

// register endpoint
const registerUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  const { email, password, name } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    // Find roles by name
    const foundRoles = await RoleService.getAll({ name: { $in: ["user"] } });

    // Create the user and associate roles
    const data = {
      email,
      name,
      password : hashedPassword, // Remember to hash the password before saving it
      roles: foundRoles.map((role) => role._id),
    };
    
    const newUser = await UserService.create(data);
    // save the new user
    if (newUser) {
      result["status"] = "success";
      result["data"] = newUser;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to add a new record.`;
      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
    
};

// login endpoint
const loginUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };  
    
  if (!req.body.email || !req.body.password) {
    result["message"] = "Email Address and Password is required.";

    response.status(401).json(result);
  }
  // check if email exists
  UserService.getByField({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            result["message"] = "Passwords does not match";

            res.status(401).json(result);
          }

          const JWT_SECRET = process.env.JWT_SECRET || "SECRET-TOKEN";
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
          );

          //   return success response
          res.status(200).send({
            status: "success",
            message: "Login Successful",
            data: {
              email: user.email,
              token
            }
          });
        })
        // catch error if password does not match
        .catch((error) => {
          result["message"] = "Passwords does not match";

          res.status(401).json(result);
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      result["message"] = "Email Address not found.";

      res.status(401).json(result);
    });
};

const logoutUser = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };  
    
  result["status"]  = "success";
  result["message"] = "Logged out successfully";

  res.json(result);
};

const userInfo = async (req: Request, res: Response) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  try {
    const userId = req.user.userId;
    const data = await UserService.get(userId);
    if (data) {
      /* const sanitizedUser = sanitizeUser(data); */
      result["status"] = "success";
      result["data"] = req.user;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error: any) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

function sanitizeUser(user) {
    const { _id, email, name, roles } = user;
    return { _id, email, name, roles };  
}
module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
  userInfo,
};
