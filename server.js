const SMTPServer = require('smtp-server').SMTPServer
const {simpleParser} = require('mailparser');

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
    onData(stream, session, cb) {
        simpleParser(stream, (err, mail) => {
            if (err) {
                console.error('Error parsing email:', err);
                return cb(err);
            }
            console.log('Parsed email:', mail.html);
            cb();
        });

        stream.on('end', () => {
            console.log('Email processing complete');
        });
    }
})


server.listen(25, (res)=>{
    console.log('server is listening at port 25')
})
