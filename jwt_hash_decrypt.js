// Nodejs 12.22.2

const jwt = require('jsonwebtoken');
const yargs = require('yargs');

const argv = yargs
  .option('secret', {
    description: 'The secret key to use',
    type: 'string',
    demandOption: true,
  })
  .option('string', {
    description: 'The string to hash',
    type: 'string',
  })
  .option('token', {
    description: 'The token to decrypt',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv;

function hashString(secret, string) {
  const obj = {githubToken: string}
  console.log('obj', obj)
  // string === '{"githubToken": "ghp_..."}'
  // obj === {githubToken: "ghp_..."}
  return jwt.sign(obj, secret, { algorithm: 'HS256' });
}

function decryptString(secret, token) {
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    // decoded === {githubToken: "ghp_...", iat: 123...}
    //verify looks for decoded.githubToken
    return decoded
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
}

if (argv.string) {
  console.log(hashString(argv.secret, argv.string));
} else if (argv.token) {
  console.log(decryptString(argv.secret, argv.token));
} else {
  console.log('Please provide either a string or a token to operate on');
}