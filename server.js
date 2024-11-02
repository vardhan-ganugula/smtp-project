const { SMTPServer } = require('smtp-server');
const { MailParser } = require('mailparser');

const server = new SMTPServer({
    authOptional: true,
    allowInsecureAuth: true,
    onConnect(session, cb) {
        console.log(`Client connected: ${session.id}`);
        cb();
    },
    onMailFrom(address, session, cb) {
        console.log(`Mail from: ${address.address}`);
        cb();
    },
    onRcptTo(address, session, cb) {
        console.log(`Recipient to: ${address.address}`);
        cb();
    },
    onData(stream, session, cb) {
        const parser = new MailParser();

        // Handle parsed email data
        parser.on('end', (mail) => {
            console.log('Parsed email:', mail);
        });

        // Pipe incoming email data to the MailParser
        stream.pipe(parser);

        // Call the callback to indicate that the email has been processed
        stream.on('end', () => {
            console.log('Email processing complete');
            cb();
        });
    }
});

// Start the SMTP server
server.listen(25, () => {
    console.log('Server is listening at port 25');
});
