const express = require('express');
const router = express.Router();
const commands = require('./commands');

const ERROR = 'error';
const SUCCESS = 'success';

let genericResponseObject = {
    status: SUCCESS,
    data: commands
};

/* GET home page. */
router.get('/', (req, res) => {
    return res.json(genericResponseObject);
});

router.post('/:text', (req, res) => {
    const receivedText = req.params.text.toLowerCase();
    
    let newCommands;
    if (receivedText.includes('on')) {
        newCommands = applianceModifier(receivedText, 1);
        genericResponseObject.data = newCommands;
    } else if (receivedText.includes('off')) {
        newCommands = applianceModifier(receivedText, 0);
    } else {
        return res.json({
            status: ERROR,
            data: -1
        });
    }

    return res.json(genericResponseObject);
});

const applianceModifier = (receivedText, setting) => {
    if (receivedText.includes('bulb')) {
        commands.bulb = setting;
    } else if (receivedText.includes('fan')) {
        commands.fan = setting;
    } else if (receivedText.includes('fridge')) {
        commands.fridge = setting;
    } else if (receivedText.includes('pump')) {
        commands.pump = setting;
    } else if (receivedText.includes('tv')) {
        commands.tv = setting;
    } else if (receivedText.includes('all')) {
        commands.bulb = setting;
        commands.fan = setting;
        commands.fridge = setting;
        commands.pump = setting;
        commands.tv = setting;
    }

    return commands;
};

module.exports = router;
