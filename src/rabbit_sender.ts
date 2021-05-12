const amqp = require('amqplib/callback_api');

const rabbitConnect = (queueName: string, msg: string) => {
  // create channel 
  amqp.connect('amqp://localhost', (err: any, channel: any) => {
    if (err) {
      throw err;
    }
    // create a channel
    channel.createChannel((channelErr: any, channel: any) => {
      if (channelErr) {
        throw channelErr;
      }
      // assert Queue 
      channel.assertQueue(queueName, {
        durable: true
      })
      // send message to queue 
      channel.sendToQueue(queueName, Buffer.from(msg), {
        persistent: true
      });
    })
    setTimeout(function () {
      channel.close();
      process.exit(0)
    }, 500);

  })


}

module.exports = {
  rabbitConnect
}