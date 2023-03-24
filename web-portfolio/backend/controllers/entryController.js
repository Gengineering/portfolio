const connection = require('../config/db')
const db = connection.useDb('portfolio')
const Entry = require('../models/entry')
const cloudinary = require('../config/cloudinaryConfig')
const upload = require('../config/multerConfig')

exports.createEntry = async (req, res) => {
  const { category, title, caption } = req.body
  console.log(req.files.thumbnail)
  console.log(req.files.images)
  // Handle single file upload for the thumbnail
  const thumbnail = req.files.thumbnail[0]
  const thumbnailPath = thumbnail.path
  
  // Handle multiple file upload for the images
  const images = req.files.images
  const imagePaths = images.map(image => image.path)
  console.log(imagePaths)

  try {
    // Upload the thumbnail and images to Cloudinary
    const uploadPromises = [cloudinary.uploader.upload(thumbnailPath)]
    imagePaths.forEach(image => uploadPromises.push(cloudinary.uploader.upload(image)))

    // Wait for all uploads to complete and extract the URLs
    const uploadResults = await Promise.all(uploadPromises)
    const thumbnailUrl = uploadResults[0].secure_url
    const imageUrls = uploadResults.slice(1).map(result => result.secure_url)

    // Save the new entry to the database
    const entry = new Entry({
      category,
      title,
      caption,
      thumbnail: thumbnailUrl,
      images: imageUrls
    })
    await entry.save()

    res.status(201).send(entry)
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}
  

exports.getEntry = async (req, res) => {
  const category = req.params.category
  console.log(category)

  try {
    const entries = await Entry.find({ category })
    console.log(entries)
    res.json(entries)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

exports.deleteEntry = async (req, res) => {
    // const { id } = req.params

    // try {
    //   const entry = await Entry.findByIdAndDelete(id)
    //   res.send(entry)
    // } catch (err) {
    //   res.status(400).send(err)
    // }
}