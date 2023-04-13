import express, { json } from 'express'
const router = express.Router()
import ParkingLot from '../model/parkingLot.js'

const slotType = [
'small',
'Medium',
'Large',
'XLarge'
]

const slotMap = {
'small': 0,
'Medium': 1,
'Large': 2,
'XLarge': 3
}
const handleGetSlot = (parkingLotId, slot) => {
    return new Promise(async (resolve, reject) => {
        try{
            let parkingLot
            parkingLot = await ParkingLot(parkingLotId).find({slotType: slot, isAvailable: true}).limit(1)
            if(!parkingLot.length){
               slot = slotType[slotMap[slot] + 1]
               if(slot){
                parkingLot = await handleGetSlot(parkingLotId, slot)
                resolve(parkingLot)
               }else{
                   resolve({})
               }
            }else{
                resolve(parkingLot[0])
            } 
        }catch(err){
            reject(err)
        }
    })
}
const bookParking = async(parkingLotId, slotId) => {
    const book = await ParkingLot(parkingLotId).findByIdAndUpdate(slotId,{isAvailable: false})
   return Promise.resolve(book)
}

router.get('/:parkingLotId/:size', async(req, res) => {
    const { parkingLotId, size } = req.params
    
    try{
        const parkingLot = await handleGetSlot(parkingLotId, size)
        if(Object.keys(parkingLot).length){
           const book = await bookParking(parkingLotId, parkingLot._id)
           console.log(book)
        }
        res.json(parkingLot)
    }catch(error){
        console.log(error)
        res.json(error)
    } 
})

export default router



