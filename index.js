'use strict';

//require the Twilio module and create a REST client
// var client = require('twilio')(process.env.accountSid, process.env.authToken);
var twilio = require('twilio');

var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var app = express();
var router = express.Router();

var lastMessage = '';

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test route
router.get('/', function (req, res) {
  res.status(200).send('Hello world!');
});

router.post('/send', function(req, res, next) {
  decipher(req.body.message, req.body.level, req.body.number);
  res.status(200).send('Hello world!');
});

app.post('/reply', function(req, res) {
  lastMessage = req.body.Body;
  res.status(200);
});

app.get('/last', function(req, res) {
  var obj = {
    message: lastMessage
  }
  lastMessage = req.body;
  res.status(200).send(JSON.stringify(obj));
});



router.post('/test', function(req, res, next) {
  decipher(req.body.message, req.body.level, req.body.number);
  res.status(200).send(req.body.message);
});

app.use('/', router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('listening on port ' + port);
});

function decipher(message, level, number) {
  var subtext = message;
  var level = parseInt(level);

    if (message.toLowerCase().indexOf("Let's hang".toLowerCase()) === 0 || message.toLowerCase().indexOf("What's up?".toLowerCase()) === 0) {
      if (level === 1) {
        subtext = "Come over ;)";
      }

      if (level === 2) {
        subtext = "Wanna bang?"
      }

      if (level === 3) {
        subtext = "I'm touching myself This is an invitation";
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman wants to have sex with you. Do you want to have sex with him?"
      }
    }

    else if (message.toLowerCase().indexOf("I'm fine".toLowerCase()) === 0) {
      if (level === 1) {
        subtext = "Not Cool";
      }

      if (level === 2) {
        subtext = "You're a fucking pig";
      }

      if (level === 3) {
        subtext = "I've been on my couch cry-puking into an empty ice cream tub for an hour. I need to empty it, but I can't move. I loved you";
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "You hurt Dustin Freeman and he is waiting for an apology"
      }

    }

    else if (message.toLowerCase().indexOf('For sure'.toLowerCase()) === 0 ) {
      if (level === 1) {
        subtext = "If you say so";
      }

      if (level === 2) {
        subtext = "You're an idiot";
      }

      if (level === 3) {
        subtext = "I'm not going to bother telling you you're wrong because, sincerely, you're not worth the conversation. I would be totally cool with never talking to you again";
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman thinks that your comments are both incorrect and offensive"
      }
    }

    else if (message.toLowerCase().indexOf('You too'.toLowerCase()) === 0 ) {
      if (level === 1) {
        subtext = "Thanks?";
      }

      if (level ===2) {
        subtext = "I cannot reciprocate."
      }

      if (level === 3) {
        subtext = "I want to be polite and say something nice back, and maybe I'm just extremely self-involved, but I don't think I know you.";
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman isn't sure what you expect from this interaction";
      }
    }

    else if (message.toLowerCase().indexOf('kk'.toLowerCase()) === 0 || message.toLowerCase().indexOf('👍') === 0 || message.toLowerCase().indexOf('cool'.toLowerCase()) === 0 || message.toLowerCase().indexOf('sounds good'.toLowerCase()) === 0) {

      if (level === 1) {
        subtext = "Sure";
      }

      if (level === 2) {
        subtext = "I don't care";

      }

      else if (level === 3) {
        subtext = "This was not nearly important enough to waste my time with. If this is how you seek validation you have a lot of work to do on yourself. I have no room in my life for half-people."
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman doesn't need to be a part of this conversation";
      }
    }

    else if (message.toLowerCase().indexOf('Yup'.toLowerCase()) !== -1 || message.toLowerCase().indexOf('Right'.toLowerCase()) !== -1 ) {
      if (level === 1) {
        subtext = "Like I said";
      }

      if (level === 2 ) {
        subtext = "You're literally just quoting me";
      }

      if (level === 3 ) {
        subtext = "That was not your idea. You have no new ideas. The only reason you're in a position where I'm forced to interact with you is because you steal other people's ideas. You are a garbage person and add nothing to society";
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman just wants his contributions to be recognized";
      }
    }

    else if (message.toLowerCase().indexOf("judge".toLowerCase()) !== -1 ) {
      if (level === 1) {
        subtext = "Oo, look at this. A crisp $20 bill.";
      }

      if (level === 2) {
        subtext = "I will do anything to win. Anything."
      }

      if (level === 3) {
        subtext = "I need this. Please, let me win. This is sincerely all I have. If I lose I have to move back to Windsor and it'll be all your fault. Can you live with that?"
        subtext = subtext.toUpperCase();
      }

      if (level === 4) {
        subtext = "Dustin Freeman is not above bribery";
      }
    }

    console.log(subtext);

    send(subtext, number);

}

function send(message, number) {
  client.messages.create({
    to: number,
    from: "+12267790585",
    body: message
    },
    function(err, message) {
      console.log(message);
  });
}
