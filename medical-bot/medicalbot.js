const { ActivityHandler, MessageFactory } = require('botbuilder');
const axios = require('axios');

class MEDICALBOT extends ActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context, next) => {
            const userQuery = context.activity.text;

            try {
                const answer = await this.getMedicalAnswer(userQuery);
                await context.sendActivity(MessageFactory.text(answer, answer));
            } catch (error) {
                console.error(`Error fetching medical answer: ${error}`);
                await context.sendActivity("I'm sorry, I couldn't fetch an answer to your question at the moment. Please try again later.");
            }

            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome to the Medical Bot! How can I assist you today?';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            await next();
        });
    }

    async getMedicalAnswer(question) {
        const qnaResponse = await this.queryQnAService(question);
        const cluResponse = await this.queryCLUService(question);

        const shortAnswer = this.processQnAResponse(qnaResponse);
        const intent = this.processCLUResponse(cluResponse);

        return `${shortAnswer} (Detected Intent: ${intent})`;
    }

    async queryQnAService(question) {
        const qnaEndpoint = process.env.QNA_ENDPOINT;
        const qnaKey = process.env.QNA_KEY;

        const response = await axios.post(qnaEndpoint, {
            question,
            top: 1,
            confidenceScoreThreshold: 0.5,
            answerSpanRequest: {
                enable: true,
                topAnswersWithSpan: 1,
                confidenceScoreThreshold: 0.5
            }
        }, {
            headers: {
                'Ocp-Apim-Subscription-Key': qnaKey,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    async queryCLUService(question) {
        const cluEndpoint = process.env.CLU_ENDPOINT;
        const cluKey = process.env.CLU_KEY;

        const response = await axios.post(cluEndpoint, {
            kind: "Conversation",
            analysisInput: {
                conversationItem: {
                    id: "1",
                    text: question,
                    modality: "text",
                    language: "en",
                    participantId: "1"
                }
            },
            parameters: {
                projectName: "AutomatedCustomerService_Intent",
                deploymentName: "IntentRecognizer_Deployment_1",
                stringIndexType: "TextElement_V8"
            }
        }, {
            headers: {
                'Ocp-Apim-Subscription-Key': cluKey,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    processQnAResponse(response) {
        if (response && response.answers && response.answers.length > 0) {
            const topAnswer = response.answers[0];
            return topAnswer.answer;
        }
        return "I'm not sure about that. Could you please provide more details or ask another question?";
    }

    processCLUResponse(response) {
        if (response && response.result && response.result.prediction && response.result.prediction.topIntent) {
            return response.result.prediction.topIntent;
        }
        return "unknown";
    }
}

module.exports.MEDICALBOT = MEDICALBOT;
