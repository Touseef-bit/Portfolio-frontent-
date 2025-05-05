const appError = require('../utils/appError')
const getEmail = require('../utils/getEmail')


const sendEmail = async (req, res, next) => {
    const { name, email, message } = req.body
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !email || !message) {
        return next(new appError('All fields are required!', 400))
    }
    if (!isValidEmail) {
        return next(new appError('Please enter a valid Email Address.', 400))
    }
    try {
        const sendingEmail = await getEmail(name, email, message)
        if (sendingEmail) {
            return res.status(200).json({
                message: 'Message sent successfully!'
            })
        } else {
            return next(new appError('Please enter a valid Email Address.', 400))
        }
        next()
    } catch (error) {
        return next(new appError('Internal Server Error!', 500))
    }
}


module.exports = sendEmail