module.exports = class LogRequests {
  constructor() {
    this.requests = [];
  }

  addRequest(request) {
    this.requests.push(request);
  }

  clearRequests() {
    this.requests = [];
  }

  getRequests() {
    return this.requests;
  }

  getRequestsLength() {
    return this.requests.length;
  }

  getPrintableRequests() {
    return this.requests.map(({ method, status }) => `${method} ${status}`).join(', ');
  }
};
