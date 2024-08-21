import QrCode from 'qrcode';
const qrGenerator ={
 
  generator: async(req,res,next)=>{
  try{
      const id= req.params.id;
      const url = `http:localhost:4000/api/patients/${id}`;
      const qrcode = await QrCode.toDataURL(url);
      res.setHeader('Content-Type','image/png');
      const base64Data = qrcode.replace(/^data:image\/png;base64,/,"");
      const img = Buffer.from(base64Data,"base64");
      res.send(img);
  }
  catch(err){
    console.log(err);
    res.status(400).send("error during generating")
  }

  }


};

export default qrGenerator;