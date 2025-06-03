import { Inngest } from "inngest";
import conncetDB from "./db";
import User from "@/models/User";
import toast from "react-hot-toast";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "rumicart-next" });

// Inngest function to save user data in the database
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
      await conncetDB();
      await User.create(userData);
  }
);

// Inngest function to update user data in the database
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
      await conncetDB();
      await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data
      await conncetDB();
      await User.findByIdAndDelete(id);
  }
);
