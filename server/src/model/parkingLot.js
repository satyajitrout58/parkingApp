import mongoose from 'mongoose'

const parkingLotSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
    id: String,
    floor: Number,
    isAvailable: Boolean,
    slotType: String
})

const ParkingLot = (parkingLotId) => mongoose.model(parkingLotId, parkingLotSchema)


export default ParkingLot