import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient();

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const body = JSON.parse(event.body);

    const { session_id, user_id, event_type } = body;

    if (!session_id || !user_id || !event_type) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing session_id, user_id or event_type',
        }),
      };
    }

    const result = await sqs.send(
      new SendMessageCommand({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(body),
      })
    );

    console.log('✅ Message sent to SQS:', result.MessageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'queued', messageId: result.MessageId }),
    };
  } catch (err) {
    console.error('❌ Failed to queue message:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error', details: err.message }),
    };
  }
};
