const router = require('express').Router();
const Eureka = require('eureka-js-client').Eureka;

// example configuration
const client = new Eureka({
    // application instance information
    instance: {
        app: 'SI-Exam-Gamehub',
        instanceId: 'SI-Exam-Gamehub',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port:  {
            '$': 8081,
            '@enabled': 'true',
        },
        vipAddress: 'SI-Exam-Gamehub',
        statusPageUrl: 'http://localhost:3001/info',
        dataCenterInfo:  {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        // eureka server host / port
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    },
});

client.logger.level('debug');

client.start(function(error){
    console.log(error || 'complete')});

// module.exports = router;