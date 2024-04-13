


const { translateSentence } = require('../../ai/ai.message.js');


const aiController = {
    translate: (req, res) => {
        const { sentence } = req.body;
        const translatedSentence = translateSentence(sentence);
        res.json({ translatedSentence });
    }
};

module.exports = aiController;
// Your code here