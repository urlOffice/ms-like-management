const amqp = require('amqplib/callback_api');

const rabbitConnect = (queueName: string) => {
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

      // this will determine how many messages are in each queue instances
      channel.prefetch(1);

      // send message to queue 
      channel.consume(
        queueName,
        function consumingMessageCB(msg: any) {
          console.log(`receives message: ${msg.content.toString()}`)
          setTimeout(function () {
            channel.ack(msg)
          })
        },
        {
          noAck: false
        }
      );

    })



  })


}

module.exports = {
  rabbitConnect
}