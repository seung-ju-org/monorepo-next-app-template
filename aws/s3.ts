import getAWS from '#aws/aws';

async function getS3() {
  const aws = await getAWS();
  return new aws.S3({
    apiVersion: '2006-03-01',
  });
}

export default getS3;
