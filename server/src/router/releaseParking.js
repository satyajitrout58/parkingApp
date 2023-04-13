import express from 'express'
import {ObjectId} from 'mongoose'
import ParkingLot from '../model/parkingLot.js'

const router = express.Router()

router.put('/:parkingLotId/:slotId', async(req, res) => {
    const { parkingLotId, slotId } = req.params
    try{
        const parkingLot = await ParkingLot(parkingLotId).findByIdAndUpdate(slotId,{isAvailable: true})
        console.log(parkingLot)
        res.json(parkingLot)
    }catch(error){
        console.log(error)
        res.json(error)
    } 
})

export default router