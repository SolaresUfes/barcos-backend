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
exports.saveFileToStorage = void 0;
const admin = __importStar(require("firebase-admin"));
// Configuração do Firebase Admin SDK para acesso ao Storage
const dataProcessing_1 = require("./dataProcessing");
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "telemetria-2da30",
        clientEmail: "firebase-adminsdk-em6is@telemetria-2da30.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDH+gTxJGahEJZo\nfy74FWjIYLFh+8C5IWfurR/WAhzID7xjYQ4DqnMeeGGsZWGlRpTSa2bO6jR1X1p5\nzYJkW6h08AxN03fbtaOxYGhtvkeeLb3cxm5aUdFaV0lAs2b6/z3UMNpcQyF5OvCh\nptNrNyyil3edLxkD56FiGnHMj/0ODMNKNKkvHYCPqMjQbb7IyNwmyJApknDe2sxq\nae7O3NaBFafxDd1jhBWwbDYeJplWtj9lv4byTbdhgMcdZksjuXHuAOQvdNciBFbf\nrdCWoKIEgM2g2qzStmZhrrwbiR10ZAk2sa0fHTORw8HKY0Oup/GOA7nr1BbIxy7a\nyZDlEu1jAgMBAAECggEAUhTZenFKfsnkMrghe0quW7D0nhdLn7GKi3kcHCd50NRE\nqzXnHrIT1mnrDWv/jGtQIp5a8ItJRPQCmwQzhSXqGzV8l2U5SUFhEylTM9hqZQ65\nY6k/GmuC1uYE9z2sA1JI+pOizUPwtWXv5yomlVdsRsCNJEN0rRmiMDZSh3iCkgUJ\nVPt9RErS1T/TTJpNbuTzoNAnVAfLmkeJArkAXXquS52sJHsb0gwGpZCTeCTCd8Od\nvd4SuQYNC9Uh2a6yBVU7NMMUUTSXv6MSc5BheDKe6dyV2JWpTN5bvySi0OMz2jUV\ns4zq+ZFHeWhqcoT27EfIWcrGBLc2hOsDvpL/r/LdoQKBgQDjUnWsEdcgsm9v7cL9\nM8LFFuhB5MNHZNzDX1yGAFA1lvrbfsmkJ+0MiFwKfNbTUd1SUjGClRMY2gbisTlW\npTRJSNLvEVRKi4U6fNJwqHvixKet/7SGeDoH9oQAp4nyh3TtxEoyRkUbZfRKKNfD\nf6uFGvhqqlsiXnQzB3vkfs1wXQKBgQDhNGq5qW+5NN3nvxjnB1Dn152I91n1HWI7\n9Ikis7ii1YLC/DpmQUNvKSLtdcLJcKIOrOPaMdNJNA0BQCCCj0bWjdKf69UD7Ott\n8D+iFcU1I1c99SraKFEec7C1ico1paAyA7gBY9LyCmOCy3ZSYI+8kLTmRaXrRyx9\n4orJkZr4vwKBgQC/GzvCBN2Op3P37TLYGwPLHY70lpV1F95ggXMPVIQaCWury9NJ\nJierOZfnWTxhO5mM83ycAyei5OiU+9jwdsKWOZrbUP5EDTdcDEP+YiaEZj9xkF78\nDWb7+srOogre0fIDUdnumhTPC89r6Ro7SMGxjRL62Wz0X+PgYpJNbizYIQKBgASP\nWiXeP2vhnSinHur2o/W90OvIDmM/MBEEt44jU3bAmgA2uTv+0E286H8kZkhL5owj\nhg2R+rQ9wJGo6b+bBRUtE/m2/b4xmubD+ZXfmPmleIvBnheCv3m9X/OdEaIac27v\n0lb83XWXLkKkugWa/O4VhAQxntVvwH/gCW1hbGDjAoGBAJMPI6nni5NjJESJqujh\nVGiw7OQk9LssNfmIZuC98FUweXq0ROiEoz/T/44UQ6Y8pKm8t0Hs4kI/CnCYeSuO\nEaGPXlfZ6JFbmJIlRodopIQATifpkvt4nei2kNOBqjxoCRRORODj1dgrJ5Kny4rx\nS1ZBBFyVHvJz6PP1H9rWdQD6\n-----END PRIVATE KEY-----\n" === null || "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDH+gTxJGahEJZo\nfy74FWjIYLFh+8C5IWfurR/WAhzID7xjYQ4DqnMeeGGsZWGlRpTSa2bO6jR1X1p5\nzYJkW6h08AxN03fbtaOxYGhtvkeeLb3cxm5aUdFaV0lAs2b6/z3UMNpcQyF5OvCh\nptNrNyyil3edLxkD56FiGnHMj/0ODMNKNKkvHYCPqMjQbb7IyNwmyJApknDe2sxq\nae7O3NaBFafxDd1jhBWwbDYeJplWtj9lv4byTbdhgMcdZksjuXHuAOQvdNciBFbf\nrdCWoKIEgM2g2qzStmZhrrwbiR10ZAk2sa0fHTORw8HKY0Oup/GOA7nr1BbIxy7a\nyZDlEu1jAgMBAAECggEAUhTZenFKfsnkMrghe0quW7D0nhdLn7GKi3kcHCd50NRE\nqzXnHrIT1mnrDWv/jGtQIp5a8ItJRPQCmwQzhSXqGzV8l2U5SUFhEylTM9hqZQ65\nY6k/GmuC1uYE9z2sA1JI+pOizUPwtWXv5yomlVdsRsCNJEN0rRmiMDZSh3iCkgUJ\nVPt9RErS1T/TTJpNbuTzoNAnVAfLmkeJArkAXXquS52sJHsb0gwGpZCTeCTCd8Od\nvd4SuQYNC9Uh2a6yBVU7NMMUUTSXv6MSc5BheDKe6dyV2JWpTN5bvySi0OMz2jUV\ns4zq+ZFHeWhqcoT27EfIWcrGBLc2hOsDvpL/r/LdoQKBgQDjUnWsEdcgsm9v7cL9\nM8LFFuhB5MNHZNzDX1yGAFA1lvrbfsmkJ+0MiFwKfNbTUd1SUjGClRMY2gbisTlW\npTRJSNLvEVRKi4U6fNJwqHvixKet/7SGeDoH9oQAp4nyh3TtxEoyRkUbZfRKKNfD\nf6uFGvhqqlsiXnQzB3vkfs1wXQKBgQDhNGq5qW+5NN3nvxjnB1Dn152I91n1HWI7\n9Ikis7ii1YLC/DpmQUNvKSLtdcLJcKIOrOPaMdNJNA0BQCCCj0bWjdKf69UD7Ott\n8D+iFcU1I1c99SraKFEec7C1ico1paAyA7gBY9LyCmOCy3ZSYI+8kLTmRaXrRyx9\n4orJkZr4vwKBgQC/GzvCBN2Op3P37TLYGwPLHY70lpV1F95ggXMPVIQaCWury9NJ\nJierOZfnWTxhO5mM83ycAyei5OiU+9jwdsKWOZrbUP5EDTdcDEP+YiaEZj9xkF78\nDWb7+srOogre0fIDUdnumhTPC89r6Ro7SMGxjRL62Wz0X+PgYpJNbizYIQKBgASP\nWiXeP2vhnSinHur2o/W90OvIDmM/MBEEt44jU3bAmgA2uTv+0E286H8kZkhL5owj\nhg2R+rQ9wJGo6b+bBRUtE/m2/b4xmubD+ZXfmPmleIvBnheCv3m9X/OdEaIac27v\n0lb83XWXLkKkugWa/O4VhAQxntVvwH/gCW1hbGDjAoGBAJMPI6nni5NjJESJqujh\nVGiw7OQk9LssNfmIZuC98FUweXq0ROiEoz/T/44UQ6Y8pKm8t0Hs4kI/CnCYeSuO\nEaGPXlfZ6JFbmJIlRodopIQATifpkvt4nei2kNOBqjxoCRRORODj1dgrJ5Kny4rx\nS1ZBBFyVHvJz6PP1H9rWdQD6\n-----END PRIVATE KEY-----\n" === void 0 ? void 0 : "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDH+gTxJGahEJZo\nfy74FWjIYLFh+8C5IWfurR/WAhzID7xjYQ4DqnMeeGGsZWGlRpTSa2bO6jR1X1p5\nzYJkW6h08AxN03fbtaOxYGhtvkeeLb3cxm5aUdFaV0lAs2b6/z3UMNpcQyF5OvCh\nptNrNyyil3edLxkD56FiGnHMj/0ODMNKNKkvHYCPqMjQbb7IyNwmyJApknDe2sxq\nae7O3NaBFafxDd1jhBWwbDYeJplWtj9lv4byTbdhgMcdZksjuXHuAOQvdNciBFbf\nrdCWoKIEgM2g2qzStmZhrrwbiR10ZAk2sa0fHTORw8HKY0Oup/GOA7nr1BbIxy7a\nyZDlEu1jAgMBAAECggEAUhTZenFKfsnkMrghe0quW7D0nhdLn7GKi3kcHCd50NRE\nqzXnHrIT1mnrDWv/jGtQIp5a8ItJRPQCmwQzhSXqGzV8l2U5SUFhEylTM9hqZQ65\nY6k/GmuC1uYE9z2sA1JI+pOizUPwtWXv5yomlVdsRsCNJEN0rRmiMDZSh3iCkgUJ\nVPt9RErS1T/TTJpNbuTzoNAnVAfLmkeJArkAXXquS52sJHsb0gwGpZCTeCTCd8Od\nvd4SuQYNC9Uh2a6yBVU7NMMUUTSXv6MSc5BheDKe6dyV2JWpTN5bvySi0OMz2jUV\ns4zq+ZFHeWhqcoT27EfIWcrGBLc2hOsDvpL/r/LdoQKBgQDjUnWsEdcgsm9v7cL9\nM8LFFuhB5MNHZNzDX1yGAFA1lvrbfsmkJ+0MiFwKfNbTUd1SUjGClRMY2gbisTlW\npTRJSNLvEVRKi4U6fNJwqHvixKet/7SGeDoH9oQAp4nyh3TtxEoyRkUbZfRKKNfD\nf6uFGvhqqlsiXnQzB3vkfs1wXQKBgQDhNGq5qW+5NN3nvxjnB1Dn152I91n1HWI7\n9Ikis7ii1YLC/DpmQUNvKSLtdcLJcKIOrOPaMdNJNA0BQCCCj0bWjdKf69UD7Ott\n8D+iFcU1I1c99SraKFEec7C1ico1paAyA7gBY9LyCmOCy3ZSYI+8kLTmRaXrRyx9\n4orJkZr4vwKBgQC/GzvCBN2Op3P37TLYGwPLHY70lpV1F95ggXMPVIQaCWury9NJ\nJierOZfnWTxhO5mM83ycAyei5OiU+9jwdsKWOZrbUP5EDTdcDEP+YiaEZj9xkF78\nDWb7+srOogre0fIDUdnumhTPC89r6Ro7SMGxjRL62Wz0X+PgYpJNbizYIQKBgASP\nWiXeP2vhnSinHur2o/W90OvIDmM/MBEEt44jU3bAmgA2uTv+0E286H8kZkhL5owj\nhg2R+rQ9wJGo6b+bBRUtE/m2/b4xmubD+ZXfmPmleIvBnheCv3m9X/OdEaIac27v\n0lb83XWXLkKkugWa/O4VhAQxntVvwH/gCW1hbGDjAoGBAJMPI6nni5NjJESJqujh\nVGiw7OQk9LssNfmIZuC98FUweXq0ROiEoz/T/44UQ6Y8pKm8t0Hs4kI/CnCYeSuO\nEaGPXlfZ6JFbmJIlRodopIQATifpkvt4nei2kNOBqjxoCRRORODj1dgrJ5Kny4rx\nS1ZBBFyVHvJz6PP1H9rWdQD6\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n')
    }),
    storageBucket: "telemetria-2da30.appspot.com"
});
// Função que converte um array de strings em um arquivo txt e salva no Storage
function saveFileToStorage(stringsArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = admin.storage().bucket();
        // Convert the string array to a single string
        const text = stringsArray.join("\n");
        // Create a reference to the file in Firebase Storage
        const file = bucket.file(`logs/${(0, dataProcessing_1.getDataAtualBrasil)().format('DD-MM-YYYY HH:mm:ss')}.txt`);
        // Upload the file to Firebase Storage
        file.save(text, {
            metadata: {
                contentType: "text/plain"
            }
        }, function (error) {
            if (error) {
                console.error("Error uploading file:", error);
            }
            else {
                console.log("File uploaded successfully.");
            }
        });
    });
}
exports.saveFileToStorage = saveFileToStorage;
