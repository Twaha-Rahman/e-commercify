function getIpAddress(request) {
  let clientIpAddress;

  if (request.headers) {
    clientIpAddress = request.headers['x-forwarded-for'];
  } else {
    clientIpAddress = request.connection.remoteAddress;
  }

  // We might get IPv4 or IPv6. So we'll need to handle that here
  // Like some sort of conversion or keep both

  return clientIpAddress;
}

module.exports = getIpAddress;
