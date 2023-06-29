"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gptResponse = void 0;
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const configuration = new openai_1.Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new openai_1.OpenAIApi(configuration);
function gptResponse(promptText, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!promptText) {
            res.end();
            throw new Error('No prompt text');
        }
        console.log('Prompt text', promptText);
        try {
            const completion = yield openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: promptText }],
                temperature: 0.9,
                stream: true,
            }, { responseType: 'stream' });
            completion.data.on('data', (data) => {
                const lines = data.toString().split('\n').filter((line) => line.trim() !== '');
                for (const line of lines) {
                    const message = line.replace(/^data: /, '');
                    // console.log(message)
                    if (message === '[DONE]') {
                        console.log('Stream finished');
                        return res.end();
                    }
                    try {
                        const parsed = JSON.parse(message);
                        const content = parsed.choices[0].delta.content;
                        console.log(content);
                        if (content) {
                            // res.write(`data: ${content}\n\n`);
                            res.write(content);
                        }
                    }
                    catch (error) {
                        console.error('Could not JSON parse stream message', message, error);
                        throw error;
                    }
                }
            });
        }
        catch (error) {
            console.error('Error in gptResponse', error);
            throw error;
        }
    });
}
exports.gptResponse = gptResponse;
