class Sender {
  static webContents;

  static init(webContents) {
    this.webContents = webContents;
  }

  static send(channel, payload) {
    this.webContents.send(channel, payload);
  }
}

module.exports = {
  Sender
}