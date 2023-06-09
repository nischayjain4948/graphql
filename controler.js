
// This is a  controller file which is used to make the controller function for the graph-ql apis continiously
const Product = require("./models/Product");

exports.findAllItems = async (req, res) => {
    try {
        const allItems = await Product.find({}).lean();
        return allItems
    }
    catch (error) {
        return `Something wrong, ${error}`;
    }


}

exports.findSingleItem = async (id) => {
    try {
        return await Product.findOne({ id })
    }
    catch (error) {
    }
}