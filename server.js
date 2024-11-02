const SMTPServer = require('smtp-server').SMTPServer
const mailParser = require('mailparser').simpleParser

const server = new SMTPServer({
    authOptional : true,
    allowInsecureAuth: true,
    onConnect(session, cb){
        console.log(session.id)
        cb()
    },
    onMailFrom(address, session, cb){
        cb()
    },
    onRcptTo(address, session, cb){
        cb()
    },
    onData(stream,session,cb){
        stream.on('data', (data)=> {
            mailParser.then(result => console.log(result))
        })
        stream.on('end', cb)
    }
})


server.listen(25, (res)=>{
    console.log('server is listening at port 25')
})
