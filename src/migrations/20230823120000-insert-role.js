// src/migrations/20230823120000-insert-role.ts
import mongoose from 'mongoose';

const Role = require("../models/role.model");

export async function up(): Promise<void> {
   console.log('demo');
    /* await Role.create({
    //name: 'admin',
    // Add other role fields here
  });
} */

export async function down(): Promise<void> {
  //await Role.deleteOne({ name: 'admin' }); // Implement the rollback logic if needed
}
