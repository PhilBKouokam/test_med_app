const mongoose = require('mongoose');
/*mongoose.set('strictQuery', false);
const mongoURI =  "mongodb://root:2SRK6Hi0nbNz5lmiLJldIr5I@172.21.45.25:27017";
//const mongoURI = "mongodb://localhost:27017"; // For local testing

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};*/

const connectToMongo = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/stayhealthy", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected successfully (manual mode)");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
    }
  };

module.exports = connectToMongo;