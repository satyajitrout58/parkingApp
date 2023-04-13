import express from 'express'
import ParkingLot from '../model/parkingLot.js'

const router = express.Router()

function generateSlots(floorNumber, slotType, numberOfSlot) {
    const slots = []
    for (let i = 0; i < numberOfSlot; i++) {
        slots.push({
            floor: floorNumber,
            isAvailable: true,
            slotType: slotType
        })
    }
    return slots;
}

router.post('/', async(req, res) => {
    const { floors = [], parkingLot } = req.body
    try {
        if (floors.length) {
            const generetedSlots = []
            floors.forEach(element => {
                const { floorNumber, small, Medium, Large, XLarge } = element
                const smallSlots = generateSlots(floorNumber, 'small', small)
                const MediumSlots = generateSlots(floorNumber, 'Medium', Medium)
                const LargeSlots = generateSlots(floorNumber, 'Large', Large)
                const XLargeSlots = generateSlots(floorNumber, 'XLarge', XLarge)
                const slotInFloors = [...smallSlots, ...MediumSlots, ...LargeSlots, ...XLargeSlots]
                generetedSlots.push(...slotInFloors)
            });
            console.log(generetedSlots)
            const newParkingLot = await ParkingLot(parkingLot).insertMany(generetedSlots)
            res.json(newParkingLot)
        }
    } catch (err) {
        res.json({
            err,
            status: 500
        })
    }

    
    // res.json(savedParkingLot)
})

export default router