const BookingModel = require("../../Models/User/BookingModel");

const slotBooking = async (req, res) => {
    try{
    const { fromdate,todate,id} = req.query;
    console.log(req.query);
    const {band,name,email,mobile,advprice,peoplecount,occassion,address,message} = req.body
    const find = await BookingModel.findOne({ bandId:id,fromdate:fromdate,todate:todate });
    if (!find) {
      const detailData = new BookingModel({
        bandId:id,
        name: name,
        email: email,
        mobile: mobile,
        advprice: advprice,
        peoplecount:peoplecount,
        occassion:occassion,
        fromdate:fromdate,
        todate:todate,
        band:band,
        address:address,
        message:message,
      });
      await detailData.save();
      res.json({ message: true });
    } else {    
        console.log('else');
      res.json({success:false});
    }
  } catch (error) {
    console.log("catch");
    console.error(error);
  }

}

// const bookingFetch = async (req, res) => {
//     try {
//       const {email} = req.query
//       console.log(req.query);
//       const bookingDetail = await BookingModel.find({ email:email });
//       console.log(bookingDetail);
//       if (!bookingDetail) {
//         res.json({ success: true });
//       } else {
//         const lastBooking = bookingDetail[bookingDetail.length - 1];
//         res.json({ message: lastBooking });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const bookingdetailsFetch = async (req, res) => {
    try {
      const {email} = req.params
      console.log(req.params);
      const bookingDetail = await BookingModel.find({ email:email });
    //   console.log(bookingDetail);
      if (!bookingDetail) {
        res.json({ success: true });
      } else {
        const lastBooking = bookingDetail[bookingDetail.length - 1];
        res.json({ message: lastBooking });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const cancel = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await BookingModel.findById(id);
        if (find.status === true) {
          await BookingModel.findByIdAndUpdate(id, { $set: { status: false } });
          res.json({ message: true });
        } else {
          await BookingModel.findByIdAndUpdate(id, { $set: { status: true } });
          res.json({message : true});
        }
    } catch (error) {
      console.log(error);
    }
  };
  



module.exports = {
  slotBooking,
//   bookingFetch,
  bookingdetailsFetch,
  cancel,
};