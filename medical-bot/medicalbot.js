const { ActivityHandler, MessageFactory } = require('botbuilder');
const axios = require('axios');

class MEDICALBOT extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const question = context.activity.text;
            const answer = await this.getAnswerFromQnAService(question);
            await context.sendActivity(MessageFactory.text(answer, answer));
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome! I can help with medical questions.';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            await next();
        });
    }

    async getAnswerFromQnAService(question) {
        const response = await axios.post(process.env.QNA_ENDPOINT, {
            top: 1,
            question: question,
            includeUnstructuredSources: true
        }, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.QNA_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.answers && response.data.answers.length > 0) {
            return response.data.answers[0].answer;
        } else {
            return 'I am not sure about that. Can you please provide more details?';
        }
    }
}

module.exports.MEDICALBOT = MEDICALBOT;
