//declare var document;

/*export enum EPlaycanvasEvents {
  IFrameReady = "IFrameReady",
  ParseData = "ParseData",
  StartGame = "StartGame",
}*/

class Playcanvas {
  /*private iframeContent;
  private iframeReady;
  private messagesQueue;*/

  constructor() {
    this.iframeReady = false;
    this.messagesQueue = [{type:"StartGame",data:""}];
  }

  async connectToIframe() {
    while (!document.getElementById("game-iframe")) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log(document.getElementById("game-iframe"));

    // @ts-ignore
    this.iframeContent = document.getElementById("game-iframe").contentWindow;

    // --- postMessage event handlers
    window.addEventListener("message", this.parseMessage.bind(this));
  }

  parseMessage(event) {
    console.log("parse msg called");
    console.log(event);
    if (!event.data || !event.data.type) return;
    console.log("parsing in progress");

    switch (event.data.type) {
      case "IFrameReady":
        this.iframeReady = true;
        console.log("COMMUNICATION!");
        // --- send queue messages
        this.messagesQueue.forEach(message => {
          this.sendMessage(message.type, message.data);
        });
        break;
      case "StartGame":
        break;
      default:
        break;
    }
  }

  sendMessage(type, data) {
    console.log("send msg called");
    console.log(type)
    // --- if we aren't ready, queue messages for sending later
    if (this.iframeReady === false) {
      this.messagesQueue.push({
        type: type,
        data: data
      });
      return;
    }

    this.iframeContent.postMessage(
      {
        type: type,
        data: data
      },
      "*"
    );
  }
}

export default Playcanvas;