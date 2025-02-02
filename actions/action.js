"use server"
import { PinataSDK } from "pinata-web3"

const gateway = "purple-realistic-worm-339.mypinata.cloud";
const pinata = new PinataSDK({
    pinataJwt : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwOGMyNzQ0YS1mMDU5LTRkYjQtOWYyMS00MDdmYTM3ZGM2ZjkiLCJlbWFpbCI6ImhhcnNoaXRoczQ1NThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImM3NGE5Y2M3ZjQ3NWRlNWUzNWFjIiwic2NvcGVkS2V5U2VjcmV0IjoiZDM2ZDZhNWEwODk2M2Q3MjZiNjA2YmNhYzkyZGMxZDc4OTVkYWUyNDI5YzljMzdhNjM2NDAxZDFkNWMxZmRlZiIsImV4cCI6MTc3MDA0NzQxMX0.GpK6_dkFjxwHm2r0qhxeqgUSnosLUIkwaJ8lJPOYZcQ',
    pinataGateway : gateway
})
    const jsonData = {
        name : "OPPO",
        symbol : "OPP",
        description : "Only possible on solana",
        image : "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/image.png",
    }

  export async function uploadMetadata(data) {
    try {
        
        // const data = JSON.stringify(jsonData);
        const result = await pinata.upload.json(data)
        console.log(result);
        const ipfshash = result.IpfsHash;
        const metadataUrl = `https://${gateway}/ipfs/${ipfshash}`
        console.log(metadataUrl);
        return metadataUrl;
    } catch (error) {
        console.log("error while uploading metadata", error);
    }
}

