"use strict";

var QWebChannelMessageTypes = {
    signal: 1,
    propertyUpdate: 2,
    init: 3,
    idle: 4,
    debug: 5,
    invokeMethod: 6,
    connectToSignal: 7,
    disconnectFromSignal: 8,
    setProperty: 9,
    response: 10
};

var QWebChannel = function(transport, initCallback)
{
    if (typeof transport !== "object" || typeof transport.send !== "function") {
        console.error("The QWebChannel transport object is invalid!");
    }

    var channel = this;
    this.transport = transport;

    this.send = function(data)
    {
        if (typeof data !== "string") {
            data = JSON.stringify(data);
        }
        channel.transport.send(data);
    };

    this.transport.onmessage = function(message)
    {
        var data = message.data;
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        channel.handleMessage(data);
    };

    this.execCallbacks = {};
    this.execCount = 0;
    this.objects = {};

    this.handleMessage = function(message)
    {
        switch (message.type) {
            case QWebChannelMessageTypes.response:
                var res = message.res;
                if (channel.execCallbacks[message.id]) {
                    channel.execCallbacks[message.id](res);
                    delete channel.execCallbacks[message.id];
                }
                break;
            case QWebChannelMessageTypes.init:
                for (var objectName in message.data) {
                    channel.objects[objectName] = new QObject(objectName, message.data[objectName], channel);
                }
                if (initCallback) {
                    initCallback(channel);
                }
                break;
        }
    };

    channel.send({type: QWebChannelMessageTypes.init});
};

function QObject(name, data, webChannel)
{
    this.__id__ = name;
    var obj = this;

    for (var i = 0; i < data.methods.length; ++i) {
        var methodName = data.methods[i][0];
        obj[methodName] = (function(methodName) {
            return function() {
                var args = [];
                var callback;
                for (var j = 0; j < arguments.length; ++j) {
                    if (typeof arguments[j] === "function") {
                        callback = arguments[j];
                    } else {
                        args.push(arguments[j]);
                    }
                }
                var id = webChannel.execCount++;
                if (callback) {
                    webChannel.execCallbacks[id] = callback;
                }
                webChannel.send({
                    type: QWebChannelMessageTypes.invokeMethod,
                    object: obj.__id__,
                    method: methodName,
                    args: args,
                    id: id
                });
            };
        })(methodName);
    }
}