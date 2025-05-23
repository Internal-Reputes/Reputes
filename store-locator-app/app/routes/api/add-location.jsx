import { json } from "@remix-run/node";
import { connectDB } from "~/utils/db.server"; // make sure this connects to MongoDB
import { Location } from "~/models/Location"; // your provided schema

export const action = async ({ request }) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const locationData = {
      name: formData.get("name"),
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      state: formData.get("state"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      email: formData.get("email"),
    };

    // Optional: Basic validation
    if (!locationData.name || !locationData.address1 || !locationData.city || !locationData.zip || !locationData.state || !locationData.country) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLocation = new Location(locationData);
    await newLocation.save();

    return json({ message: "Location added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding location:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
