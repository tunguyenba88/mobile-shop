const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '../../../server/.env' });

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

exports.upload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    });
    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.remove = (req, res) => {
  cloudinary.uploader.destroy(req.body.public_id, (err, _result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: 'upload failed' });
    } else {
      res.send('ok');
    }
  });
};
