const SMTPServer = require('smtp-server').SMTPServer
const mailParser = require('mailparser').MailParser
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
        const parser = new mailParser();
        parser.on('on' , data => {console.log(data)})
        stream.pipe(parser)
        stream.on('end', cb)
    }
})


server.listen(25, (res)=>{
    console.log('server is listening at port 25')
})
