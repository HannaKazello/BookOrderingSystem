import crontab from 'node-crontab';

// This will call this function every 2 minutes
const sheduler = () => {
  const jobId = crontab.scheduleJob('*/2 * * * *', () => {
    console.info("It's been 2 minutes!");
  });
};

export default sheduler;
