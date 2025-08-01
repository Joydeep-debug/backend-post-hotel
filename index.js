const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());
const {initializeDatabase} = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
initializeDatabase();

app.use(express.json());

// const newHotel2 = {
//   name: "The Oberoi Grand",
//   category: "Hotels",
//   location: "15, Jawaharlal Nehru Rd, New Market Area, Dharmatala, Taltala, Kolkata",
//   rating: 4.4,
//   reviews: ["Oberoi Grand, Kolkata -A colonial-era 5-star hotel with stunning architecture and old-world charm. Spacious, elegantly designed rooms with modern amenities.Exceptional hospitality with personalized attention."],
//   website: "https://oberoihotels.com",
//   phoneNumber: "01169110606",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Pool", "Spa", "Fitness centre", "Restaurant", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://oberoihotels.com/oberoihotels-photo1.jpg", "https://oberoihotels.com/oberoihotels-photo2.jpg"]
// }

async function createNewHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        return saveHotel;
    } catch(error){
      throw error
    }
}

app.post("/hotels", async (req, res) => {
    try{
        const savedHotel = await createNewHotel(req.body);
        console.log(savedHotel);
        res.status(201).json({message: "Hotel added successfully.", hotel: savedHotel});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to add hotel."});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});