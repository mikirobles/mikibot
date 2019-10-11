const insults = require("./insults");
const opinion = require("./opinion");
const counting = require("./counting");

const pipe = [
    counting,
    opinion,
    insults
];

const getResponseForMessage = ({message, bot}) => {
    for (let i = 0; i < pipe.length; i++) {
        const mod = pipe[i];
        const response = mod({message, bot});
        if (response) {
            return response;
        }
    }
}

module.exports = getResponseForMessage;