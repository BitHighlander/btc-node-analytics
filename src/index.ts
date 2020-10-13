/*
    How many nodes in aws?

1602605678
 */

//get timestamp from bitnodes snapshot
const TIMESTAMP = "1602605678"

const Axios = require('axios')
const https = require('https')
const axios = Axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
const isAwsIp = require('is-aws-ip')
let getNode = async function(){
    try{
        let resp = await axios({method:'GET',
            url: 'https://bitnodes.io/api/v1/snapshots/'+TIMESTAMP})

        console.log("resp: ",resp.data.nodes.length)
        let awsCount = 0
        let nodes = Object.keys(resp.data.nodes)
        for(let i = 0; i < nodes.length; i++){
            let node = nodes[i]
            node = node.replace(":8333","")
            console.log("node: ",node)
            if(isAwsIp(node)){
                console.log("WINNING  ****** ")
                //remove port

                awsCount++
            }
        }
        console.log(awsCount)
    }catch(e){
        console.error(e)
    }
}
getNode()